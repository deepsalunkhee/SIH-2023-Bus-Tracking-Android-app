import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity} from 'react-native';

const OTP = ({ navigation }) => {
  const [otp, setOTP] = useState('');

  const handleOTPChange = (text) => {
    setOTP(text);
  };

  const handlePress = () => {
    navigation.navigate('Cityselection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleOTPChange}
          value={otp}
          keyboardType="numeric"
          maxLength={6}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Enter</Text>
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
  inputContainer: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white', // White input background color
    marginBottom: 20,
  },
  input: {
   
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
   
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

});

export default OTP;
