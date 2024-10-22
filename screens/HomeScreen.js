import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
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

  const navigateToResource = (resourceName) => {
    const resourceMap = {
      LocalCommunity: 'Resource1',
      Financial: 'Resource2',
      Healthcare: 'Resource3',
      Employment: 'Resource4',
      Transportation: 'Resource5',
      Language: 'Resource6',
    
    };
    navigation.navigate(resourceMap[resourceName]);
  };

  const resources = [
    { name: 'LocalCommunity', label: 'Local Community', info: 'Find local community resources.', symbol: '1', image: require('../assets/Community.png') },
    { name: 'Financial', label: 'Financial Resources', info: 'Get financial assistance and advice.', symbol: '2', image: require('../assets/Financial2.png') },
    { name: 'Healthcare', label: 'Healthcare Resources', info: 'Access healthcare services and information.', symbol: '3', image: require('../assets/Healthcare2.png') },
    { name: 'Employment', label: 'Employment', info: 'Find job opportunities and career advice.', symbol: '4', image: require('../assets/Employment2.png') },
    { name: 'Transportation', label: 'Transportation', info: 'Learn about transportation options.', symbol: '5', image: require('../assets/Transportation2.png') },
    { name: 'Language', label: 'Language', info: 'Improve your language skills.', symbol: '6', image: require('../assets/Language2.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {resources.map((resource, index) => (
          <TouchableOpacity key={index} style={styles.resourceRow} onPress={() => navigateToResource(resource.name)}>
            <View style={styles.leftContent}>
              <View style={styles.iconContent}>
                <Image source={resource.image} style={styles.resourceImage} />
              </View>
              <View style={styles.textContent}>
                <Text style={styles.resourceLabel}>{resource.label}</Text>
                <Text style={styles.resourceInfo}>{resource.info}</Text>
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
  resourceRow: {
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
    marginRight: 10,
  },
  resourceImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
 // resourceSymbol: {
 //   color: '#333',
 //   fontSize: 18,
 //   fontWeight: '600',
 // },
  textContent: {
    flexDirection: 'column',
  },
  resourceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  resourceInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    marginTop: 4,
  },
});

export default HomeScreen;
