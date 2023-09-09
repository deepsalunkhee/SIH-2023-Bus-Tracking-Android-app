import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const SDselection = ({ navigation }) => {
  const [pickup, setPickup] = useState(''); // State for pickup input
  const [dropoff, setDropoff] = useState(''); // State for drop-off input

  const handlePickupSelection = () => {
    // Implement your logic for pickup selection here
    // You can navigate to the pickup selection screen if needed
  };

  const handleDropOffSelection = () => {
    // Implement your logic for drop-off selection here
    // You can navigate to the drop-off selection screen if needed
  };

  return (
    <View style={styles.container}>
      {/* Upper Half with Image */}
      <View style={styles.upperHalf}>
        <Image source={require('./assets/Home.2.jpg')} style={styles.image} />
      </View>

      {/* Lower Half with Input Fields and Buttons */}
      <View style={styles.lowerHalf}>
        <Text>Select Options:</Text>

        {/* Pickup Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Select Pickup"
            value={pickup}
            onChangeText={(text) => setPickup(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handlePickupSelection} style={styles.inputButton}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>

        {/* Drop-off Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Select Drop-off"
            value={dropoff}
            onChangeText={(text) => setDropoff(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleDropOffSelection} style={styles.inputButton}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperHalf: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  lowerHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default SDselection;
