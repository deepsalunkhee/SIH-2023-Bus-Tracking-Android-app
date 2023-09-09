import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const StopselectionD = ({ navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [stops, setStops] = useState([
    'A',
    'B',
    'C',
    'X',
    'Y',
    'Z',
  
  ]);
  const [selectedStopD, setSelectedStopD] = useState('');

 

  const handleStopSelect = (stop) => {
    setSelectedStopD(stop);
    setSearchText(stop);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredStops = stops.filter((stop) =>
    stop.toLowerCase().includes(searchText.toLowerCase())
  );

  const returnSelectedStop = () => {
    
    navigation.navigate('SDselection', { selectedStopD });
  };

  return (
    <View style={styles.container}>
      <Text>Stop Selection</Text>
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
            <Text>{item}</Text>
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
  },
  stopItem: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StopselectionD;