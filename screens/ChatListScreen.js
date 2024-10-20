import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../firebase'; // Make sure to import your firebase setup
import firebase from 'firebase/compat/app';
import BottomTabs from '../components/home/BottomTabs';

const ChatListScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsubscribe1 = db.collection('chats')
            .where('user1', '==', firebase.auth().currentUser.uid) 
            .orderBy('lastMessageTimestamp', 'desc')
            .onSnapshot(snapshot => {
                fetchChatUsers(snapshot.docs);
            });
    
        const unsubscribe2 = db.collection('chats')
            .where('user2', '==', firebase.auth().currentUser.uid)
            .orderBy('lastMessageTimestamp', 'desc')
            .onSnapshot(snapshot => {
                fetchChatUsers(snapshot.docs);
            });
    
        // Cleanup listener on unmount
        return () => { unsubscribe1(); unsubscribe2(); };
    }, []);
    
    const fetchChatUsers = async (chatDocs) => {
        const fetchedChats = await Promise.all(chatDocs.map(async doc => {
            const data = doc.data();
            const otherUserId = data.user1 === firebase.auth().currentUser.uid ? data.user2 : data.user1;
    
            // Fetch user details
            const userDoc = await db.collection('users').where("owner_uid", "==", otherUserId).limit(1).get();
            const userData = !userDoc.empty ? userDoc.docs[0].data() : {};
    
            return {
                id: doc.id,
                lastMessage: data.lastMessage,
                lastMessageTimestamp: data.lastMessageTimestamp,
                userId: otherUserId,
                profile_picture: userData.profile_picture || '',
                username: userData.username || 'Unknown',
            };
        }));
    
        setChats(previousChats => {
            // Create a map to avoid duplicate chat entries
            const chatMap = new Map();
    
            // Add existing chats to the map
            previousChats.forEach(chat => {
                chatMap.set(chat.id, chat);
            });
    
            // Add or update fetched chats in the map
            fetchedChats.forEach(chat => {
                chatMap.set(chat.id, chat);
            });
    
            // Convert the map back to an array and sort by lastMessageTimestamp
            return Array.from(chatMap.values()).sort((a, b) => b.lastMessageTimestamp?.seconds - a.lastMessageTimestamp?.seconds);
        });
    };
    

    const handleChatPress = (chat) => {
        // Navigate to the chat screen for the selected chat
        navigation.navigate('ChatScreen', { chatID: chat.id, receiverId: chat.userId });
    };

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item)}>
            <Image source={{ uri: item.profile_picture }} style={styles.profilePicture} />
            <View style={styles.chatInfo}>
                <Text style={styles.usernameText}>{item.username}</Text>
                <Text style={styles.chatText}>{item.lastMessage}</Text>
                <Text style={styles.timestamp}>{new Date(item.lastMessageTimestamp?.seconds * 1000).toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Chats</Text>
            </View>

            <FlatList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
            <BottomTabs />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        padding: 16,
    },
    chatItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    chatInfo: {
        flex: 1,
    },
    usernameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatText: {
        fontSize: 14,
    },
    timestamp: {
        fontSize: 12,
        color: 'gray',
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
});

export default ChatListScreen;
