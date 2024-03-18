import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import images from '../constants/images';
import {Colors} from '../theme/types';
import fonts from '../constants/fonts';
import moment from 'moment';

// Files

const FlightItem = (props: any) => {
  const theme = useTheme();
  const {colors} = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={images.flight} style={styles.airlineLogo} />
        <Text style={styles.airline}>{props.item.airline}</Text>
        <Text style={styles.seatClass}>{props.item.flightNumber}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.times}>
          <Text style={styles.departureTime}>{moment(props.item.departureTime).format('LT')}</Text>
          <Text style={styles.duration}>---- {props.item.duration} ----</Text>
          <Text style={styles.arrivalTime}>{moment(props.item.arrivalTime).format('LT')}</Text>
        </View>
        <View style={styles.times}>
        <Text style={styles.price}>{"₹" + props.item.price}</Text>
        <Text style={styles.seatsAvailable}>{"Seats Available : " + props.item.seatsAvailable}</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: Colors) =>
  StyleSheet.create({
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
      marginTop: 20,
    },
    firstContainer: {
      width: '78%',
      left: 15,
      flexDirection: 'column',
    },
    secondContainer: {
      width: '22%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 30,
      alignItems: 'center',
    },
    colorView: {
      height: 20,
      width: 20,
      borderRadius: 1000,
      marginLeft: 20,
      overflow: 'hidden',
    },
    text: {
      color: '#000000',
      fontSize: 18,
      fontFamily: fonts.bold,
    },
    text2: {
      color: '#000000',
      fontSize: 10,
      fontFamily: fonts.medium,
    },
    image: {
      width: 19,
      height: 19,
      tintColor: 'white',
      resizeMode: 'contain',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    airlineLogo: {
      width: 40,
      height: 40,
    },
    airline: {
      fontSize: 20,
      fontFamily: fonts.bold,
      color : "black"
    },
    seatClass: {
      fontSize: 20,
      fontFamily: fonts.medium,
      color : "black"
    },
    body: {
      marginTop: 20,
    },
    flightNumber: {
      fontSize: 18,
      fontFamily: fonts.bold,
      color: 'black',
    },
    times: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent : "space-between"
    },
    departureTime: {
      fontFamily: fonts.semibold,
      color: 'black',
      fontSize: 15,
    },
    duration: {
      textAlign: 'center',
      fontFamily: fonts.semibold,
      color: 'black',
    },
    arrivalTime: {
      fontFamily: fonts.semibold,
      fontSize: 15,
      color: 'black',
    },
    seatsAvailable:{
      marginTop: 15,
      fontSize: 12,
      fontFamily: fonts.semibold,
      color : "black"
    },
    price: {
      marginTop: 10,
      fontSize: 20,
      fontFamily: fonts.bold,
      color : "black"
    },
    button: {
      marginTop: 20,
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default FlightItem;
