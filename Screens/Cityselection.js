import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const Cityselection = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const citiesInHimachalPradesh = ['Shimla', 'Manali', 'Dharamshala', 'Kullu','Mumbai'];
  const [isModalVisible, setModalVisible] = useState(false);

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
        <Text>Select City:</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
          <Text>{selectedCity}</Text>
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
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text>Close</Text>
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
