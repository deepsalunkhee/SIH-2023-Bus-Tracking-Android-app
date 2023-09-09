import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OTP = ({navigation}) => {
  const [otp, setOTP] = useState('');

  const handleOTPChange = (text) => {
    setOTP(text);
  };

  const handlePress = () => {
    navigation.navigate('Cityselection');
  };

  return (
    <View style={styles.container}>
      <Text>OTP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleOTPChange}
          value={otp}
          keyboardType="numeric"
          maxLength={6}
        />
      </View>
      <Button title="Enter" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      width: '80%',
      borderRadius: 10,
      backgroundColor: 'white', // Change the background color to white or any other color
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      padding: 10,
    },
  });
  

export default OTP;
