import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '../firebase';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params; // Get username from navigation params

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from Firestore by username
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('users')
          .where('username', '==', username)
          .limit(1)
          .get();

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData); // Store the user data in the state
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header with Back Arrow */}
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Profile</Text>
        </View>
      </SafeAreaView>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {user ? (
          <>
            <Image source={{ uri: user.profile_picture }} style={styles.profileImage} />
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </>
        ) : (
          <Text style={styles.username}>User not found</Text>
        )}
      </View>

      {/* Saved Posts Section (Dummy for now) */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Saved Posts</Text>
        {/* Example saved posts */}
        <Text style={styles.noSavedPostsText}>You haven't saved any posts yet.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noSavedPostsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default ProfileScreen;
