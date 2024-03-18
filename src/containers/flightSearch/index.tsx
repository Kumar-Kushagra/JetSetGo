import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AppState,
  Button,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
// Files
import {getScreenHeight} from '../../utils/commonServices';
import {Colors} from '../../theme/types';
import {getFlightThunk} from '../../redux/common';
import {CustomTextInput} from '../../components';
import localization from '../../localization';
import images from '../../constants/images';
import fonts from '../../constants/fonts';
import FastImage from 'react-native-fast-image';

const FlightSearch = () => {
  const theme = useTheme();
  const {colors} = theme;

  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const originRef = useRef();
  const originValueRef: any = useRef();
  const destinationRef: any = useRef();
  const destinationValueRef: any = useRef();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  const searchFlights = async() => {
    let params = {
      origin: originValueRef.current.getValue(),
      destination: destinationValueRef.current.getValue(),
    };
    if (params.origin && params.destination) {
      setIsLoading(true)
      await dispatch(getFlightThunk(params));
      setIsLoading(false)
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.safe}>
        <Text style={styles.title}>
          {localization.welcome}{' '}
          <Text style={{...styles.title, color: colors.secondary}}>
            {localization.jet}
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={styles.subTitle}>{localization.welcomeText}</Text>
          <FastImage
            resizeMode="contain"
            style={styles.icon}
            source={images.flight}
          />
        </View>
        <View style={styles.card}>
          <CustomTextInput
            ref={originValueRef}
            inputRef={originRef}
            placeholder={`${localization.origin}`}
            type="next"
            maxLength={100}
            star
            onSubmit={() => {
              destinationRef.current.focus();
            }}
            label={`${localization.from}`}
            rightIcon={images.takeOff}
          />
          <View style={{height: 30}}></View>
          <CustomTextInput
            ref={destinationValueRef}
            inputRef={destinationRef}
            placeholder={`${localization.destination}`}
            type="done"
            maxLength={100}
            star
            onSubmit={() => {
              Keyboard.dismiss();
            }}
            label={`${localization.to}`}
            rightIcon={images.landing}
          />
          <TouchableOpacity
            disabled = {isLoading}
            style={styles.searchFlights}
            onPress={() => searchFlights()}>
           {isLoading ? <ActivityIndicator />  :  <Text style={styles.text}>{localization.searchFlights}</Text>}
          </TouchableOpacity>
        </View>
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
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: '90%',
      alignSelf: 'center',
      paddingVertical: 30,
    },
    searchFlights: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#000000',
      height: 50,
      alignSelf: 'center',
      marginTop: 50,
    },
    text: {
      fontSize: 16,
      color: '#ffffff',
      fontFamily: fonts.light,
    },
    title: {
      fontSize: 35,
      color: theme.textColor,
      marginHorizontal: 20,
      fontFamily: fonts.bold,
      width: '65%',
      marginTop: 30,
    },
    subTitle: {
      fontSize: 23,
      color: theme.textColor,
      marginLeft: 20,
      fontFamily: fonts.light,
    },
    icon: {
      width: 30,
      height: 30,
      bottom: 4,
    },
  });
};

export default FlightSearch;
