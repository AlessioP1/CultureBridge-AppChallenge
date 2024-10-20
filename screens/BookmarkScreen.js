import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Post from '../components/home/Post';

const BookmarkScreen = () => {
    const navigation = useNavigation();
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    useEffect(() => {
        // Fetch bookmarked posts for the currently logged-in user
        const fetchBookmarkedPosts = async () => {
            // Replace with your actual data fetching logic
            const response = await fetch('https://api.example.com/bookmarked-posts');
            const data = await response.json();
            setBookmarkedPosts(data);
        };

        fetchBookmarkedPosts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Arrow */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Bookmarked Posts</Text>
            </View>

            {/* Bookmarked Posts List */}
            <FlatList
                data={bookmarkedPosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Post post={item} />}
                contentContainerStyle={styles.listContainer} // Optional styling for the list
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 15,
        // Optional: You can add a background color or elevation for the header if desired
        // backgroundColor: '#fff',
        // elevation: 3, // Android shadow
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    listContainer: {
        paddingHorizontal: 15, // Optional: padding for the list items
    },
});

export default BookmarkScreen;
