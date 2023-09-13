import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Register = ({ navigation }) => {
  const [mobile, setMobile] = useState('');

  const goToOTP = () => {
    // Ensure mobile number is not empty or handle validation
    if (mobile.trim() === '') {
      alert('Please enter a valid mobile number.');
      return;
    }
    
    navigation.navigate('OTP');
  };

  const handleChange = (text) => {
    setMobile(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Authentication</Text>
     
      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        onChangeText={handleChange}
        value={mobile}
        keyboardType="numeric"
        
      />

      <TouchableOpacity
        style={styles.button}
        onPress={goToOTP}
      >
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
    backgroundColor: '#88F3F8', // Green background color
  },
  title: {
    color: '#006400', // Green text color
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black', // Teal border color
    marginBottom: 10, // Decreased margin
    padding: 10,
    color: 'black',
    backgroundColor: '#4FF9B1', // White background color
  },
  button: {
    backgroundColor: '#006400', // Green button background color
    padding: 10,
    borderRadius: 10,
    marginTop: 10, // Decreased margin
  },
  buttonText: {
    color: 'white', // White button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 400,
    marginTop: 10, // Decreased margin
    
    bottom: -110,
  },
});

export default Register;
