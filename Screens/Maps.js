// import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import { PermissionsAndroid } from 'react-native';

// const dummyBusData = {
//   BusCategory1: {
//     route: ['A-B', 'B-C', 'C-D'],
//     Buses: {
//       Bus1: {
//         'x-coordinate': 18.98472661761661,
//         'y-coordinate': 72.83011345121656,
//         Time: {
//           'A': '12:00',
//           'B': '12:30',
//           'C': '13:00',
//           'D': '13:30',
//         },
//       },
//       Bus2: {
//         'x-coordinate': 34.567,
//         'y-coordinate': 89.012,
//         Time: {
//           'A': '15:00',
//           'B': '15:30',
//           'C': '14:00',
//           'D': '14:30',
//         },
//       },
//     },
//   },
//   BusCategory2: {
//     route: ['X-Y', 'Y-Z', 'Z-W'],
//     Buses: {
//       Bus3: {
//         'x-coordinate': 56.789,
//         'y-coordinate': 90.123,
//         Time: {
//           'X': '12:00',
//           'Y': '12:30',
//           'Z': '13:00',
//           'W': '13:30',
//         },
//       },
//       Bus4: {
//         'x-coordinate': 78.901,
//         'y-coordinate': 12.345,
//         Time: {
//           'X': '15:00',
//           'Y': '15:30',
//           'Z': '14:00',
//           'W': '14:30',
//         },
//       },
//     },
//   },
//   BusCategory3: {
//     route: ['A-B', 'X-Y', 'Z-W'],
//     Buses: {
//       Bus1: {
//         'x-coordinate': 15.345,
//         'y-coordinate': 67.890,
//         Time: {
//           'A': '12:00',
//           'B': '12:30',
//           'C': '13:00',
//           'D': '13:30',
//         },
//       },
//       Bus2: {
//         'x-coordinate': 30.567,
//         'y-coordinate': 89.012,
//         Time: {
//           'A': '15:00',
//           'B': '15:30',
//           'C': '14:00',
//           'D': '14:30',
//         },
//       },
//     },
//   },
//   // Add more bus categories here
// };

// const Maps = ({ Category }) => {
//   useEffect(() => {
//     requestPermission();
//   }, []);

//   const requestPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Cool Photo App Camera Permission',
//           message:
//             'Cool Photo App needs access to your camera ' +
//             'so you can take awesome pictures.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the camera');
//       } else {
//         console.log('Camera permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     // Use Geolocation to get the user's current location
//     const watchId = Geolocation.getCurrentPosition(
//       (position) => {
//         console.log(position);
//         setUserLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         // See error code charts below.
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );

//     return () => {
//       // Clean up the watch when the component unmounts
//       Geolocation.clearWatch(watchId);
//     };
//   }, []);

//   // Rest of your component code...
//   const BusCategory = dummyBusData[Category] ? Category : 'BusCategory1';
//   const selectedBuses = dummyBusData[BusCategory].Buses;

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ height: '100%', width: '100%' }}
//         region={{
//           latitude: 18.980838641761963,
//           longitude: 72.83864769335194,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         showsUserLocation={true}
//         userLocationAnnotationTitle="Your Location"
//       >
//         {/* Display user's location marker */}
//         {userLocation && (
//           <Marker
//             coordinate={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//             }}
//             title="Your Location"
//             pinColor="blue" // Set a different color for the user's location marker
//           />
//         )}

//         {/* Iterate through selectedBuses and add Marker components for buses */}
//         {Object.keys(selectedBuses).map((busName) => (
//           <Marker
//             key={busName}
//             coordinate={{
//               latitude: selectedBuses[busName]['x-coordinate'],
//               longitude: selectedBuses[busName]['y-coordinate'],
//             }}
//             title={busName}
//             description={`Next Stop: ${selectedBuses[busName].Time['A']}`}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// };

// export default Maps;

import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


dummyBusData = {
    BusCategory1: {
      route: ['A-B', 'B-C', 'C-D'],
      Buses: {
        Bus1: {
          'x-coordinate': 18.98472661761661,
          'y-coordinate': 72.83072661761661,
          Time: {
            'A': '12:00',
            'B': '12:30',
            'C': '13:00',
            'D': '13:30',
          },
        },
        Bus2: {
          'x-coordinate': 18.96772661761661,
          'y-coordinate': 72.81272661761661,
          Time: {
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
          Time: {
            'X': '12:00',
            'Y': '12:30',
            'Z': '13:00',
            'W': '13:30',
          },
        },
        Bus4: {
          'x-coordinate': 78.901,
          'y-coordinate': 12.345,
          Time: {
            'X': '15:00',
            'Y': '15:30',
            'Z': '14:00',
            'W': '14:30',
          },
        },
      },
    },
    BusCategory3: {
      route: ['A-B', 'X-Y', 'Z-W'],
      Buses: {
        Bus1: {
          'x-coordinate': 15.345,
          'y-coordinate': 67.890,
          Time: {
            'A': '12:00',
            'B': '12:30',
            'C': '13:00',
            'D': '13:30',
          },
        },
        Bus2: {
          'x-coordinate': 30.567,
          'y-coordinate': 89.012,
          Time: {
            'A': '15:00',
            'B': '15:30',
            'C': '14:00',
            'D': '14:30',
          },
        },
      },
    },
    // Add more bus categories here
  };
  
const Maps = ({Category}) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
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
        console.log('Latitude: ' + latitude + ' Longitude: ' + longitude);
      },
      error => {
        console.log('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const BusCategory = dummyBusData[Category] ? Category : 'BusCategory1';
  const selectedBuses = dummyBusData[BusCategory].Buses;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // latitude: userLocation.latitude,
          // longitude: userLocation.longitude,
          latitude: 18.980838641761963,
          longitude: 72.83864769335194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {/* Display user's location marker */}
        <Marker
          coordinate={{
            // latitude: userLocation.latitude,
            // longitude: userLocation.longitude,
            latitude: 18.980838641761963,
            longitude: 72.83864769335194,
          }}
          title="Your Location"
          pinColor="blue" // Set a different color for the user's location marker
        />

        {Object.keys(selectedBuses).map(busName => (
          <Marker
            key={busName}
            coordinate={{
              latitude: selectedBuses[busName]['x-coordinate'],
              longitude: selectedBuses[busName]['y-coordinate'],
             
            }}
            title={busName}
            description={`Next Stop: ${selectedBuses[busName].Time['A']}`}
            pinColor='green'
            
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
