import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import { POSTS } from '../data/posts';
import BottomTabs from '../components/home/BottomTabs';
import { bottomTabIcons } from '../components/home/BottomTabs';
import { firebase, db } from '../firebase';
import { useIsFocused } from '@react-navigation/native';  // Import useIsFocused

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();  // Track if HomeScreen is focused

  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      {/* Pass isFocused prop to BottomTabs to indicate if the home screen is active */}
      <BottomTabs icons={bottomTabIcons} navigation={navigation} isFocused={isFocused} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default HomeScreen;
