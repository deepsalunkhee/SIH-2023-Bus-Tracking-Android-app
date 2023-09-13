

import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';




  
const Maps = (props) => {
  const Category = props.route.params.category;
  
  const [busCoordinates, setBusCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: 20.988470948071694, 
    longitude: 50.84292203394,
  });


  useEffect(() => {
    requestPermission();
  }, []);
  



  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location for maps.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
        console.log("Hi"+userLocation);
      },
      error => {
        console.log('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("Hi" + userLocation.longitude);
  //   }, 10000); // Logs every 10 seconds
  
  //   // Clear interval on re-render to avoid memory leaks
  //   return () => clearInterval(intervalId);
  // }, [userLocation]); // Executes every time the userLocation changes

  useEffect(() => {
    console.log("Hi" + userLocation.longitude);
  }, [userLocation]); // Executes every time the userLocation changes
  
  


  useEffect(() => {
    // Fetch bus data from Firebase Realtime Database
    const busCategoryRef = database().ref(`Location/Catagory/${Category}`);
    
    
    busCategoryRef.once('value', (snapshot) => {
      const selectedBuses = snapshot.val();
      console.log(selectedBuses);
     

      // Extract bus coordinates and set them in the state
      const coordinates = Object.entries(selectedBuses).map(([busNumber, data]) => {
        
        return {
           
            busNumber,
            latitude: parseFloat(data.x),
            longitude: parseFloat(data.y),
        };
    });

      setBusCoordinates(coordinates);
      console.log(coordinates);
    });
  }, [Category]);

  return (
    <View style={styles.container}>
      
      <MapView
        
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}

        {busCoordinates.map((bus) => (
          <Marker
            key={bus.busNumber}
            coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude,
            }}
            title={`Bus ${bus.busNumber}`}
            pinColor="green"
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Maps;