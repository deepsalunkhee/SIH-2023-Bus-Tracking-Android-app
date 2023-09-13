import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import database from '@react-native-firebase/database';

const Cityselection = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [citiesInHimachalPradesh, setCitiesInHimachalPradesh] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Reference to the "Cities" node in the Firebase Realtime Database
    const citiesRef = database().ref('Cities');

    // Fetch data from the "Cities" node
    citiesRef
      .once('value')
      .then((snapshot) => {
        // Convert the snapshot to an array of city names
        const data = snapshot.val();
        const cityNames = Object.values(data || {});
        setCitiesInHimachalPradesh(cityNames);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalVisible(false);
  };

  const toSDselection = () => {
    navigation.navigate('SDselection', { selectedCity });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <Image source={require('./assets/Home12.jpeg')} style={styles.image} />
      </View>

      <View style={styles.lowerHalf}>
        <Text style={{ color: '#006400' }}>Select City:</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
          <Text style={{ color: 'black' }}>{selectedCity}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={citiesInHimachalPradesh}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCitySelect(item)} style={styles.modalItem}>
                  <Text style={{ color: 'black' }}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={toSDselection} style={styles.homeButton}>
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    
  },
  lowerHalf: {
    flex: 1,
    justifyContent: 'center',
    
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dropdown: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4FF9B1',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    
    justifyContent: 'flex-end',
    bottom: 10,
  },
  modalContent: {
    backgroundColor: '#8CF88F',
    padding: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderBlockColor: 'black',
    
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    
  },
  closeButton: {
    backgroundColor: '#006400', // Green button background color
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center', // Center horizontally within the lowerHalf view
    
   
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#006400', // Green button background color
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center', // Center horizontally within the lowerHalf view
    position: 'absolute', // Position it absolutely to the bottom
    bottom: 10, // Adjust the bottom position as needed
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cityselection;
