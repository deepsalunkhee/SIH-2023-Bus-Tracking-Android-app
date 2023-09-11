import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const SDselection = ({ route, navigation }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  // Use useEffect to update the input fields based on route params
  useEffect(() => {
    if (route.params?.selectedStopP) {
      setPickup(route.params.selectedStopP);
    }
  }, [route.params?.selectedStopP]);

  useEffect(() => {
    if (route.params?.selectedStopD) {
      setDropoff(route.params.selectedStopD);
    }
  }, [route.params?.selectedStopD]);

  const handlePickupSelection = () => {
    navigation.navigate('StopsP', { selectedStopP: pickup });
  };

  const handleDropOffSelection = () => {
    navigation.navigate('StopsD', { selectedStopD: dropoff });
  };

  const handleSeeBuses = () => {
    console.log('pickup:', pickup);
    console.log('dropoff:', dropoff);
    navigation.navigate('Buses', { pickup, dropoff });
  };

  return (
    <View style={styles.container}>
      {/* Upper Half with Image */}
      <View style={styles.upperHalf}>
        <Image source={require('./assets/Home.2.jpg')} style={styles.image} />
      </View>

      {/* Lower Half with Input Fields and Buttons */}
      <View style={styles.lowerHalf}>
        <Text  style={{color:"black"}}>Select Options:</Text>

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

        {/* Display the selected value */}
        {pickup ? (
          <Text>Pickup: {pickup}</Text>
        ) : null}

        {/* Drop-off Input Field */}
        <View style={styles.inputContainer} >
          <TextInput
            placeholder="Select Drop-off"
            value={dropoff}
            onChangeText={(text) => setDropoff(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleDropOffSelection} style={styles.inputButton}>
            <Text >Select</Text>
          </TouchableOpacity>
        </View>

        {/* Display the selected value */}
        {dropoff ? (
          <Text style={{color:"black"}}>Drop-off: {dropoff}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={handleSeeBuses} style={styles.inputButton}>
        <Text >See Buses</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
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
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  inputButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    color: 'black',
  },
});

export default SDselection;
