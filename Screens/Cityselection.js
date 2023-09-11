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
        console.log('Data from Firebase:', cityNames);
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
    navigation.navigate('SDselection');
  };
  return (
    <View style={styles.container}>
    
      <View style={styles.upperHalf}>
        <Image source={require('./assets/Home.1.jpeg')} style={styles.image} />
      </View>

      <View style={styles.lowerHalf}>
        <Text style={{color:"black"}}>Select City:</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
          <Text  style={{color:"black"}}>{selectedCity}</Text>
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
                  <Text style={{color:"black"}}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.homeButton}>
              <Text style={styles.homeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
  },
  upperHalf: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    borderRadius: 10,
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
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  modalCloseButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cityselection;
