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
    </Stack.Navigator>
  </NavigationContainer>
       
  );
};

export default App;
