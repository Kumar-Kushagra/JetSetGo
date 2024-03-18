import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {
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
import FastImage from 'react-native-fast-image';
import images from '../../constants/images';
import fonts from '../../constants/fonts';
import { navigate } from '../../utils/routerServices';
import routes from '../../constants/routes';

const WelcomeScreen = () => {
  const theme = useTheme();
  const {colors} = theme;

  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <FastImage
          resizeMode="contain"
          style={styles.icon}
          source={images.airplane}
        />
      </View>
      <Text style={styles.title}>
        Let's{' '}
        <Text style={{...styles.title, color: colors?.secondary}}>Start </Text>A
        Trip With Us...
      </Text>
      <Text style={styles.subTitle}>
        This application will help you find the best flight tickets to various
        destinations in just an app!
      </Text>
      <TouchableOpacity onPress={() => navigate(routes.FLIGHT_SEARCH,{})} style={styles.getStarted}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const createStyles = (theme: Colors) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
     // paddingHorizontal: getScreenHeight(2),
    },
    safe: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    icon: {
      width: '100%',
      height: '100%',
      marginTop: 10,
    },
    title: {
      fontSize: 45,
      color: theme.textColor,
      marginHorizontal: 20,
      fontFamily: fonts.bold,
      width: '65%',
    },
    subTitle: {
      fontSize: 15,
      color: theme.textColor,
      marginTop: 30,
      marginBottom: 40,
      marginHorizontal: 20,
      fontFamily: fonts.light,
    },
    getStarted: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor:  theme.textColor,
      height: 50,
      alignSelf: 'center',
      marginBottom: 20,
    },
    getStartedText: {
      fontSize: 16,
      color: theme.backgroundColor,
      fontFamily: fonts.semibold,
    },
  });
};

export default WelcomeScreen;
