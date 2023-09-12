import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Logo = ({ navigation }) => {
  
  const goToRegistration = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('./assets/Logo1.png')} style={styles.logo} />

      <Text style={styles.welcomeText}>Welcome Yatri</Text>

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
    backgroundColor: '#00FA9A', // Set the background color to green
  },
  logo: {
    width: 200, 
    height: 200,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  welcomeText: {
    color: '#006400', // Set the text color to white
    fontSize: 24, // Increase the font size for emphasis
    fontWeight: 'bold',
    marginTop: 20,
  },
  registerButton: {
    backgroundColor: '#006400', // Change the background color to blue
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



export default Logo;
