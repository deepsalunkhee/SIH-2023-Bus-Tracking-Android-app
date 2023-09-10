import React, { useState, useEffect } from 'react';
import { View, Text, FlatList ,StyleSheet,TouchableOpacity} from 'react-native';

const dummyBusData = {
    BusCategory1: {
        route: ['A-B', 'B-C', 'C-D'],
        Buses: {
          Bus1: {
            'x-coordinate': 12.345,
            'y-coordinate': 67.890,
            Time:{
              'A': '12:00',
              'B': '12:30',
              'C': '13:00',
              'D': '13:30',
            
  
            }
          },
          Bus2: {
            'x-coordinate': 34.567,
            'y-coordinate': 89.012,
              Time:{
              'A': '15:00',
              'B': '15:30',
              'C': '14:00',
              'D': '14:30',
  
          },
        },
      },
  },
      BusCategory2: {
        route: ['X-Y', 'Y-Z', 'Z-W'],
        Buses: {
          Bus3: {
            'x-coordinate': 56.789,
            'y-coordinate': 90.123,
            Time:{
              'X': '12:00',
              'Y': '12:30',
              'Z': '13:00',
              'W': '13:30',
            }
  
            }
          },
          Bus4: {
            'x-coordinate': 78.901,
            'y-coordinate': 12.345,
              Time:{
              'X': '15:00',
              'Y': '15:30',
              'Z': '14:00',
              'W': '14:30',
              }
  
          },
        },
   
      BusCategory3: {
        route: ['A-B', 'X-Y', 'Z-W'],
        Buses: {
          Bus1: {
            'x-coordinate': 15.345,
            'y-coordinate': 67.890,
              Time:{
              'A': '12:00',
              'B': '12:30',
              'C': '13:00',
              'D': '13:30',
              }
  
          },
          Bus2: {
            'x-coordinate': 30.567,
            'y-coordinate': 89.012,
              Time:{
              'A': '15:00',
              'B': '15:30',
              'C': '14:00',
              'D': '14:30',
              }
  
          },
        },
      },
      // Add more bus categories here
    };

const SeeBusses = (props) => {
    const [busData, setBusData] = useState([]);
    const pickup = props.route.params.pickup;
    const drop = props.route.params.dropoff;
  
    useEffect(() => {
      // Simulate fetching bus data (in this case, using the dummy data)
      const fetchBusData = () => {
        // Filter bus categories based on pickup and drop points
        const filteredCategories = Object.keys(dummyBusData).filter((category) => {
          const routes = dummyBusData[category].route;
          return routes.includes(`${pickup}-${drop}`);
        });
  
        // Convert filtered categories into an array of bus objects
        const busArray = filteredCategories.map((category) => ({
          categoryName: category,
        }));
  
        setBusData(busArray);
      };
  
      // Fetch bus data when the component mounts
      fetchBusData();
    }, [pickup, drop]);
  
    const handleCategoryPress = (categoryName) => {
      // Navigate to the maps page with the selected category
      console.log(categoryName);
      props.navigation.navigate('Maps', { category: categoryName });
      console.log(categoryName);
    };
  
    const handlePathPress = (categoryName) => {
      // Handle the action for viewing the path here
      // You can navigate to another screen or perform any other action as needed
      props.navigation.navigate('Paths', { category: categoryName });
     
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={busData}
          keyExtractor={(item) => item.categoryName}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.categoryName}>{item.categoryName}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.mapButton]}
                  onPress={() => handleCategoryPress(item.categoryName)}
                >
                  <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.pathButton]}
                  onPress={()=>handlePathPress(item.categoryName)}
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
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
      padding: 16,
      margin: 8,
    },
    categoryName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
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
  });
  
  export default SeeBusses;