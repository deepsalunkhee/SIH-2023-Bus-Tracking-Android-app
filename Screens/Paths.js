import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';

const Paths = (props) => {
  const Category = props.route.params.category;
  const [CategoryData, setCategoryData] = useState({});

  useEffect(() => {
    // Fetch bus data from Firebase Realtime Database
    const busCategoryRef = database().ref(`Location/Catagory/${Category}`);

    busCategoryRef.once('value', (snapshot) => {
      const selectedBuses = snapshot.val();

      // Create a new object to organize the data by stops
      const stopsData = {};

      // Iterate through buses and their stops
      Object.entries(selectedBuses).forEach(([Number, Info]) => {
        Object.entries(Info.Time).forEach(([stop, time]) => {
          if (!stopsData[stop]) {
            stopsData[stop] = [];
          }
          stopsData[stop].push({ busNumber: Number, time });
        });
      });

      // Set the organized data in the state
      setCategoryData(stopsData);
    });
  }, [Category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Timelines</Text>
      <View style={styles.timeline}>
        {Object.entries(CategoryData).map(([stop, buses], index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.stopName}>{`Stop ${stop}`}</Text>
            <View style={styles.timeList}>
              {buses.map((bus, timeIndex) => (
                <Text key={timeIndex} style={styles.time}>{`Bus ${bus.busNumber}: ${bus.time}`}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    color: 'black',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  timeline: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'black',
  },
  timelineItem: {
    flexDirection: 'column',
    marginBottom: 12,
    color: 'black',
  },
  stopName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  timeList: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'black',
  },
  time: {
    fontSize: 16,
    color: 'black',
  },
});

export default Paths;
