import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
      <Text style={{color:"black"}}>Registration Page</Text>
     
      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        onChangeText={handleChange}
        value={mobile}
        keyboardType="numeric"
        
      />

      <Button title="Register & Login" onPress={goToOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    color: 'black',
  },
});

export default Register;
