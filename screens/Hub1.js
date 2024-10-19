import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Post from '../components/home/Post';
import { db } from '../firebase';

const Hub1 = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('hubs').doc('Hub1').collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Latino Hub</Text>
          <View style={styles.addPostContainer}>
            <Text style={styles.addPostText}>Add Post</Text>
            <TouchableOpacity
              style={styles.addPostButton}
              onPress={() => navigation.navigate('NewPostScreen')}
            >
              <Ionicons name="add-circle" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <Image
        source={require('../assets/LatinoHub.jpg')}
        style={styles.banner}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.contentText}>Welcome to Hub 1! Here you can find various resources and information.</Text>
      </View>

      <View style={styles.postsContainer}>
        {posts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts available</Text>
        ) : (
          posts.map(post => (
            <Post key={post.id} post={post} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  addPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPostText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  addPostButton: {
    padding: 10,
    borderRadius: 25,
  },
  banner: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  content: {
    padding: 15,
  },
  contentText: {
    fontSize: 16,
    color: '#555',
  },
  postsContainer: {
    padding: 15,
  },
  noPostsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Hub1;
