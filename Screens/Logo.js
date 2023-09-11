import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Logo = ({ navigation }) => {
  
  const goToRegistration = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('./assets/logo.png')} style={styles.logo} />

      <Text style={{color:"black"}}>Welcome Yatri</Text>

      <TouchableOpacity onPress={goToRegistration} style={styles.registerButton}>
        <Text style={styles.buttonText}>Register & Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logo: {
    width: 200, 
    height: 200,
    resizeMode: 'contain',
  },
  registerButton: {
    backgroundColor: 'blue', // Change the background color to your preferred color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white', // Change the text color to contrast with the background
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Logo;
