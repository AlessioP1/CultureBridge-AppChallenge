import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation , useRoute} from '@react-navigation/native';
import Post from '../components/home/Post';
import { db, storage } from '../firebase';

const Hub1 = () => {
  const route = useRoute();
  const { resourceId } = route.params; // Access the hubId parameter passed from the resourceId is related to the homescreen
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const hubId = 'Hub1';
  const HubName= 'Latino';
  // Latino
  // Asian Horizons
  // AfroConnect
  // Pacific

  console.log(`Entering ${hubId} with resource ID: ${resourceId}`);
  
  useEffect(() => {
    const unsubscribe = db.collection('resources')
    .doc(resourceId)
    .collection('hubs')
    .doc(hubId)
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
        console.log(`deleting Post with id: ${postId}`);

        // Retrieve the post document to get the image URL
        const postDoc = await db.collection('resources').doc(resourceId).collection('hubs').doc(hubId).collection('posts').doc(postId).get();
        const postData = postDoc.data();

        if (postData && postData.imageUrl) {
          // Delete the image from Firebase Storage
          const imageRef = storage.refFromURL(postData.imageUrl);
          await imageRef.delete();
          console.log(`Image deleted successfully from Firebase Storage: ${postData.imageUrl}`);
        }

        // Delete the post document from Firestore
        await db.collection('resources').doc(resourceId).collection('hubs').doc(hubId).collection('posts').doc(postId).delete();
        console.log(`Post with ID ${postId} deleted successfully`);
      } catch (error) {
        console.error('Error deleting post: ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{HubName}</Text>
          <View style={styles.addPostContainer}>
            <Text style={styles.addPostText}>Add Post</Text>
            <TouchableOpacity
              style={styles.addPostButton}
              onPress={() => navigation.navigate('NewPostScreen', { hubId, resourceId })}
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
      <SafeAreaView>
        <Text style={styles.headerText}>All Posts</Text>
      </SafeAreaView>
      <View style={styles.postsContainer}>
        {posts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts available</Text>
        ) : (
          posts.map(post => (
            <Post 
              key={post.id} 
              post={post} 
              onBookmark={(id) => console.log(`Bookmark post with id: ${id}`)} 
              onDelete={handleDeletePost}
            />

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
    height: 100,
    marginBottom: 10,
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
