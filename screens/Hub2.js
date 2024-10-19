import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // For navigation
import Post from '../components/home/Post'; // Import your Post component
import { db } from '../firebase'; // Import your Firebase configuration

const Hub2 = () => {
  const navigation = useNavigation(); // Navigation hook to go back
  const [posts, setPosts] = useState([]); // State to hold posts

  // Fetch posts specific to Hub 2 from Firestore
  useEffect(() => {
    const unsubscribe = db.collection('hubs').doc('Hub2').collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })));
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Arrow */}
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Latino Hub</Text>
          {/* Add Post Text and Plus Button */}
          <View style={styles.addPostContainer}>
            <Text style={styles.addPostText}>Add Post</Text>
            <TouchableOpacity
              style={styles.addPostButton}
              onPress={() => navigation.navigate('NewPostScreen')} // Navigate to NewPostScreen
            >
              <Ionicons name="add-circle" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Banner Image */}
      <Image
        source={require('../assets/LatinoHub.jpg')} // Adjust the path based on your folder structure
        style={styles.banner}
        resizeMode="cover" // Ensures the image covers the width while keeping the aspect ratio
      />

      {/* Hub Content */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Welcome to Hub 2! Here you can find various resources and information.</Text>
      </View>

      {/* Display Posts */}
      <View style={styles.postsContainer}>
        {posts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts available</Text>
        ) : (
          posts.map((post, index) => (
            <Post post={post} key={index} />
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
    justifyContent: 'space-between', // Align items with space between
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  addPostContainer: {
    flexDirection: 'row', // Align text and button horizontally
    alignItems: 'center', // Center the items vertically
  },
  addPostText: {
    fontSize: 16,
    color: '#333', // Color for the "Add Post" text
    fontWeight: 'bold',
  },
  addPostButton: {
    // Style for the add post button
    padding: 10,
    borderRadius: 25, // Optional: Rounded corners for the button
  },
  banner: {
    width: '100%', // Full width of the screen
    height: 200, // Adjust the height as needed for the banner
    marginBottom: 10, // Space between the banner and the rest of the content
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

export default Hub2;
