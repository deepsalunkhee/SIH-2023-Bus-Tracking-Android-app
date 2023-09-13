import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const SDselection = ({route, navigation}) => {
  const selectedCity = route.params?.selectedCity;

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
    navigation.navigate('StopsP', {selectedStopP: pickup, selectedCity});
  };

  const handleDropOffSelection = () => {
    navigation.navigate('StopsD', {selectedStopD: dropoff, selectedCity});
  };

  const handleSeeBuses = () => {
    console.log('pickup:', pickup);
    console.log('dropoff:', dropoff);
    navigation.navigate('Buses', {pickup, dropoff});
  };

  return (
    <View style={styles.container}>
      {/* Upper Half with Image */}
      <View style={styles.upperHalf}>
        <Image source={require('./assets/Home.2.jpg')} style={styles.image} />
      </View>

      {/* Lower Half with Input Fields and Buttons */}
      <View style={styles.lowerHalf}>
      

        {/* Pickup Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Select Pickup"
            placeholderTextColor={'gray'}
            value={pickup}
            onChangeText={text => setPickup(text)}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handlePickupSelection}
            style={styles.inputButton}>
            <Text style={styles.ButtonText}>Select</Text>
          </TouchableOpacity>
        </View>

        {/* Display the selected value */}
        {pickup ? <Text style={{color:'black'}}>Pickup: {pickup}</Text> : null}

        {/* Drop-off Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Select Drop-off"
            placeholderTextColor={'gray'}
            value={dropoff}
            onChangeText={text => setDropoff(text)}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleDropOffSelection}
            style={styles.inputButton}>
            <Text style={styles.ButtonText}>Select</Text>
          </TouchableOpacity>
        </View>

        {/* Display the selected value */}
        {dropoff ? (
          <Text style={{color: 'black'}}>Drop-off: {dropoff}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={handleSeeBuses} style={styles.Button}>
        <Text style={styles.ButtonText}>See Buses</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    backgroundColor: '#88F3F8',
  },
  upperHalf: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '80%',
    height: 'auto', // To maintain the aspect ratio
    resizeMode: 'cover',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    borderRadius: 20,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#006400', // Border color
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
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  inputButton: {
    backgroundColor: '#006400',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  Button: {
    backgroundColor: '#006400', // Green button background color
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center', // Center horizontally within the lowerHalf view
    position: 'absolute', // Position it absolutely to the bottom
    bottom: 10, // Adjust the bottom position as needed
  },
  ButtonText: {
    color: 'white', // White button text color
    fontSize: 18,
    fontWeight: 'bold', // Bold text
  },
});

export default SDselection;
