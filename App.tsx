// App.js
import React from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from './Screens/Logo';
import Register from './Screens/Register';
import OTP from './Screens/OTP';
import Cityselection from './Screens/Cityselection';
import SDselection from './Screens/SDselection';
import StopselectionP from './Screens/StopselectionP';
import StopselectionD from './Screens/StopselectionD';
import SeeBusses from './Screens/SeeBusses';
import Maps from './Screens/Maps';
import Paths from './Screens/Paths';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen name="Logo"  component={Logo} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="Cityselection" component={Cityselection} />
      <Stack.Screen name="SDselection" component={SDselection} />
      <Stack.Screen name="StopsP" component={StopselectionP} />
      <Stack.Screen name="StopsD" component={StopselectionD} />
      <Stack.Screen name="Buses" component={SeeBusses} />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen name="Paths" component={Paths} />
    </Stack.Navigator>
  </NavigationContainer>
       
  );
};

export default App;
