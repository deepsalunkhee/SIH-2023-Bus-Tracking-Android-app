import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const dummyBusData = {
  BusCategory1: {
    route: ['A-B', 'B-C', 'C-D'],
    Buses: {
      Bus1: {
        'x-coordinate': 12.345,
        'y-coordinate': 67.890,
        Time: {
          'A': '12:00',
          'B': '12:30',
          'C': '13:00',
          'D': '13:30',
        },
      },
      Bus2: {
        'x-coordinate': 34.567,
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
  // Add more categories here
};

const Paths = (props) => {
  const category1Data = dummyBusData.BusCategory1.Buses;
  const mergedTimeData = {};

  // Merge the time data for the same stops
  Object.values(category1Data).forEach((bus) => {
    Object.entries(bus.Time).forEach(([stop, time]) => {
      if (!mergedTimeData[stop]) {
        mergedTimeData[stop] = [];
      }
      mergedTimeData[stop].push(time);
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vertical Timeline</Text>
      <View style={styles.timeline}>
        {Object.entries(mergedTimeData).map(([stop, times], index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.stopName}>{`'${stop}'`}</Text>
            <View style={styles.timeList}>
              {times.map((time, timeIndex) => (
                <Text key={timeIndex} style={styles.time}>{time}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    color: 'black',
  },
  stopName: {
    fontSize: 16,
    marginRight: 8,
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
