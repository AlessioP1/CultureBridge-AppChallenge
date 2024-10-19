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

    return () => unsubscribe();
  }, []);

  const navigateToHub = (hubName) => {
    const hubMap = {
      Latino: 'Hub1',
      AsianHorizons: 'Hub2',
      AfroConnect: 'Hub3',
      NEWConnect: 'Hub4',
      Chat: 'ChatgptText'
    };
    navigation.navigate(hubMap[hubName]);
  };

  const hubs = [
    { name: 'Latino', label: 'Latino Hub', info: 'Explore the Latin American community.', symbol: '1' },
    { name: 'AsianHorizons', label: 'Asian Horizons Hub', info: 'Connect with diverse Asian cultures.', symbol: '2' },
    { name: 'AfroConnect', label: 'AfroConnect Hub', info: 'Celebrate African and Afro-diaspora cultures.', symbol: '3' },
    { name: 'NEWConnect', label: 'NEW Hub', info: 'NEW.', symbol: '4' },
    { name: 'Chat', label: 'Try asking anything', info: 'Ask information - powered by AI', symbol: '5' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {hubs.map((hub, index) => (
          <TouchableOpacity key={index} style={styles.hubRow} onPress={() => navigateToHub(hub.name)}>
            <View style={styles.leftContent}>
              <View style={styles.iconContent}>
                <Text style={styles.hubSymbol}>{hub.symbol}</Text>
              </View>
              <View style={styles.textContent}>
                <Text style={styles.hubLabel}>{hub.label}</Text>
                <Text style={styles.hubInfo}>{hub.info}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
