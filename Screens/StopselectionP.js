import React, { useState ,useEffect} from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';

const StopselectionP = ({ route,navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  const [stops, setStops] = useState([]);
  const [selectedStopP, setSelectedStopP] = useState('');
  const selectedCity = route.params?.selectedCity;
  
  useEffect(() => {
    // Reference to the selected city's stops in the Firebase Realtime Database
    const cityStopsRef = database().ref(`Stops/Cities/${selectedCity}`);

    // Fetch data from the selected city's stops
    cityStopsRef
      .once('value')
      .then((snapshot) => {
        // Convert the snapshot to an array of stop names
        const data = snapshot.val();
        if (data) {
          const stopNames = Object.values(data).filter(stop => stop !== null);
          setStops(stopNames);
          console.log('Stops:', stopNames);
        }
      })
      .catch((error) => {
        console.error('Error fetching stops:', error);
      });
  }, [selectedCity]);

  const handleStopSelect = (stop) => {
    setSelectedStopP(stop);
    setSearchText(stop);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredStops = stops.filter((stop) =>
    stop.toLowerCase().includes(searchText.toLowerCase())
  );

  const returnSelectedStop = () => {
    
    navigation.navigate('SDselection', { selectedStopP,selectedCity });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Head}>Stop Selection</Text>
      <TextInput
        placeholder="Search Stops"
        placeholderTextColor={'gray'}
        value={searchText}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredStops}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => handleStopSelect(item)}
          
           style={styles.stopItem}>
            <Text style={{color:"black"}}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity onPress={returnSelectedStop} style={styles.Button}>
        <Text style={styles.ButtonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:"#88F3F8"
    
  },
  searchInput: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  stopItem: {
    borderWidth: 2,
    borderColor: 'balck',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
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
  Head: {
    color: 'white', // White text color
    fontSize: 18,
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center the text
    backgroundColor: 'green', // Green background color
    padding: 10, // Add some padding
    marginBottom: 10, // Add some margin bottom
    borderRadius: 10, // Round the corners
  }
  
});

export default StopselectionP;
