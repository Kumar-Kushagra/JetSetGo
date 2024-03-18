import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Files
import routes from '../constants/routes';
import FlightSearch from '../containers/flightSearch';
import FlightList from '../containers/flightList';
import WelcomeScreen from '../containers/welcomeScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
     
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.WELCOME_SCREEN} component={WelcomeScreen} />
        <Stack.Screen name={routes.FLIGHT_SEARCH} component={FlightSearch} />
        <Stack.Screen name={routes.FLIGHT_LIST} component={FlightList} />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
