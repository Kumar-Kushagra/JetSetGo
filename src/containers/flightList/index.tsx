import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

// Files
import {getScreenHeight} from '../../utils/commonServices';
import {Colors} from '../../theme/types';
import {CustomHeader} from '../../components';
import FlightItem from '../../components/FlightItem';
import images from '../../constants/images';
import {goBack} from '../../utils/routerServices';
import fonts from '../../constants/fonts';

const FlightList = () => {
  const theme = useTheme();
  const {colors} = theme;

  const styles = useMemo(() => createStyles(colors), [colors]);
  const searchedFlights = useSelector((state: any) => state.common.results);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortedFlights, setSortedFlights] = useState(searchedFlights);
  const [sortBy, setSortBy] = useState('price');
  const [selectedAirline, setSelectedAirline] = useState('');

  let airlineTypes = [
    'IndiGo',
    'Air India',
    'SpiceJet',
    'Vistara',
    'GoAir',
    'AirAsia',
  ];

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  const sortFlights = (order: string) => {
    const sorted = [...searchedFlights].sort((a, b) => {
      if (order === 'lowToHigh') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedFlights(sorted);
  };

  const filterFlights = (selected: string) => {
    setSelectedAirline(selected);
    console.log(selectedAirline);
    if (selected === '') {
      setSortedFlights(searchedFlights);
      console.log(selectedAirline);
    } else {
      const filtered = searchedFlights.filter(
        flight => flight.airline === selected,
      );
      console.log(filterFlights);
      setSortedFlights(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader
        leftIconColor={colors.textColor}
        rightIconColor={colors.textColor}
        rightIcon={images.reset}
        rightAction={() => {
          setSelectedAirline('');
          setSortedFlights(searchedFlights);
          setFilterVisible(false);
          setSortVisible(false);
        }}
        leftAction={() => {
          goBack();
        }}
        title="Available Flights"
        leftIcon={images.back}
      />
      <View style={styles.sortContainer}>
        <TouchableOpacity
          onPress={() => {
            setSortVisible(!sortVisible);
            setFilterVisible(false);
          }}
          style={styles.sort}>
          <Text style={styles.text}>Sort By Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilterVisible(!filterVisible);
            setSortVisible(false);
          }}
          style={styles.sort}>
          <Text style={styles.text}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.screen}>
        {sortVisible && (
          <View
            style={{
              ...styles.sortContainer,
              marginTop: 20,
              flexDirection: 'column',
            }}>
            <TouchableOpacity
              onPress={() => {
                sortFlights('highToLow');
                setSortBy('highToLow');
                setSortVisible(false);
              }}
              style={styles.sort}>
              <Text style={styles.text}>High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                sortFlights('lowToHigh');
                setSortBy('lowToHigh');
                setSortVisible(false);
              }}
              style={{...styles.sort, marginTop: 10}}>
              <Text style={styles.text}>Low to High</Text>
            </TouchableOpacity>
          </View>
        )}
        {filterVisible && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}>
              {airlineTypes.map((item, index) => (
                <TouchableOpacity
                  key={index} // You should use a unique key for each item in the list
                  onPress={() => {
                    filterFlights(item.toString());
                  }}
                  style={styles.filterType}>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        <FlatList
          data={sortedFlights}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{fontSize: 20,textAlign:'center',marginTop:30 ,fontFamily: fonts.semibold}}>
              No Flights Found!!
            </Text>
          )}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <FlightItem key={index} item={item} color={'#000000'} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: Colors) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: getScreenHeight(2),
    },
    safe: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    sortContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      width: '80%',
    },
    sort: {
      backgroundColor: theme.textColor,
      width: '40%',
      height: 40,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: fonts.semibold,
      fontSize: 16,
      color: theme.backgroundColor,
    },
    filterType: {
      width: 100,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.textColor,
      marginLeft: 20,
      borderRadius: 8,
    },
    filterContainer: {
      marginTop: 30,
      maxHeight: 50,
    },
  });
};

export default FlightList;
