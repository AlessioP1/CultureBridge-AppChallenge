import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import BottomTabs from '../components/home/BottomTabs';
import { bottomTabIcons } from '../components/home/BottomTabs';
import { useIsFocused } from '@react-navigation/native';
import { firebase, db } from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })));
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  // Updated navigation to match your Stack screen names
  const navigateToHub = (hubName) => {
    switch (hubName) {
      case 'LatinXLegacy':
        navigation.navigate('Hub1');
        break;
      case 'AsianHorizons':
        navigation.navigate('Hub2');
        break;
      case 'AfroConnect':
        navigation.navigate('Hub3');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.hubRow} onPress={() => navigateToHub('LatinXLegacy')}>
          <View style={styles.leftContent}>
            <View style={styles.iconContent}>
              <Text style={styles.hubSymbol}>{`1`}</Text>
            </View>
            <View style={styles.textContent}>
              <Text style={styles.hubLabel}>{`LatinX Legacy Hub`}</Text>
              <Text style={styles.hubInfo}>{`Explore the Latin American community.`}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.hubRow} onPress={() => navigateToHub('AsianHorizons')}>
          <View style={styles.leftContent}>
            <View style={styles.iconContent}>
              <Text style={styles.hubSymbol}>{`2`}</Text>
            </View>
            <View style={styles.textContent}>
              <Text style={styles.hubLabel}>{`Asian Horizons Hub`}</Text>
              <Text style={styles.hubInfo}>{`Connect with diverse Asian cultures.`}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.hubRow} onPress={() => navigateToHub('AfroConnect')}>
          <View style={styles.leftContent}>
            <View style={styles.iconContent}>
              <Text style={styles.hubSymbol}>{`3`}</Text>
            </View>
            <View style={styles.textContent}>
              <Text style={styles.hubLabel}>{`AfroConnect Hub`}</Text>
              <Text style={styles.hubInfo}>{`Celebrate African and Afro-diaspora cultures.`}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Add more hubs following this format */}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} navigation={navigation} isFocused={isFocused} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  hubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    width: '90%',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.2, // iOS shadow opacity
    shadowRadius: 3, // iOS shadow radius
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  hubSymbol: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
  },
  textContent: {
    flexDirection: 'column',
  },
  hubLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  hubInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    marginTop: 4,
  },
});

export default HomeScreen;
