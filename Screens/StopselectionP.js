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
      <Text style={{color:"black"}}>Stop Selection</Text>
      <TextInput
        placeholder="Search Stops"
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
      <TouchableOpacity onPress={returnSelectedStop} style={styles.selectButton}>
        <Text>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  stopItem: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  selectButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StopselectionP;
