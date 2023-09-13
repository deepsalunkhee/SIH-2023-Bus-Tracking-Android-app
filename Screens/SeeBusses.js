import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';

const SeeBusses = (props) => {
  const [busData, setBusData] = useState([]);
  const pickup = props.route.params.pickup;
  const drop = props.route.params.dropoff;

  useEffect(() => {
    // Reference to the "Buses" node in the Firebase Realtime Database
    const busesRef = database().ref('Buses');

    // Fetch data from the "Buses" node
    busesRef
      .once('value')
      .then((snapshot) => {
        // Convert the snapshot to an array of bus categories
        const data = snapshot.val();
        if (data) {
          const categories = Object.keys(data.Catagory);

          // Filter bus categories based on pickup and drop points
          const filteredCategories = categories.filter((category) => {
            const routes = data.Catagory[category].Routes;
            return routes.includes(`${pickup}-${drop}`);
          });

          // Convert filtered categories into an array of bus objects
          const busArray = filteredCategories.map((category) => ({
            categoryName: category,
          }));

          setBusData(busArray);
        }
      })
      .catch((error) => {
        console.error('Error fetching bus data:', error);
      });
  }, [pickup, drop]);

  const handleCategoryPress = (category) => {
    // Navigate to the maps page with the selected category
    
    
    props.navigation.navigate('Maps', { category });
  };

  const handlePathPress = (category) => {
    // Handle the action for viewing the path here
    // You can navigate to another screen or perform any other action as needed
    props.navigation.navigate('Paths', { category });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Head}>Route :{pickup}-{drop}</Text>
      <FlatList
        data={busData}
        keyExtractor={(item) => item.categoryName}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.categoryName}>Bus:{item.categoryName}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.mapButton]}
                onPress={() => handleCategoryPress(item.categoryName)}
              >
                <Text style={styles.buttonText}>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.pathButton]}
                onPress={() => handlePathPress(item.categoryName)}
              >
                <Text style={styles.buttonText}>Path</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#88F3F8"
  },
  card: {
    backgroundColor: '#C0FA82',
    borderRadius: 10,
    elevation: 5,
    padding: 16,
    margin: 8,

  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor:"#C0FA82"
    
  },
  button: {
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Adjust as needed to control the button width
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: 'blue', // Customize the button styles
  },
  pathButton: {
    backgroundColor: 'green', // Customize the button styles
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

export default SeeBusses;
