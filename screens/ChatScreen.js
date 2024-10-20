import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomTabs from '../components/home/BottomTabs';
import { db, firebase } from '../firebase'; // Make sure your firebase export includes necessary functions

const ChatScreen = ({ route, navigation }) => {
    let { receiverId } = route.params;
    let [ chatID, setChatID ] = useState(route.params?.chatID);
    const [messages, setMessages] = useState([]);
    const currentUserId = firebase.auth().currentUser.uid; // Get the current user's ID
    const [receiver_username, setReceiverUsername,] = useState('');
    const [receiver_pfp, setReceiverPFP] = useState('https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg');

    // console.log('ChatScreen: receiverId', receiverId, 'chatID', chatID, 'currentUserId', currentUserId);
    if (!receiverId) {
        // throw error
        console.error('ChatScreen: receiverId is required');
    }

    // Function to create a new chat
    const createNewChat = async () => {
        const newChatRef = db.collection('chats').doc(); // Create a new document with auto-generated ID
        await newChatRef.set({
            lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessage: '', // Initialize with an empty string
            user1: currentUserId,
            user2: receiverId
        });
        return newChatRef.id; // Return the ID of the newly created chat
    };

    // Get the receiver's profile picture and username
    const fetchProfile = async (Id) => {
        try {
            const userDoc = await db.collection('users').where("owner_uid", "==", Id).limit(1).get();
            
            if (!userDoc.empty) {
                // Destructure the profile picture and username from the document data
                const { profile_picture, username } = userDoc.docs[0].data();
                setReceiverPFP(profile_picture);
                setReceiverUsername(username);
            } else {
                console.error('No user found with the given owner_uid:', Id);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
    

    // Fetch messages from Firestore
    useEffect(() => {
        const fetchChat = async () => {

            if (!chatID && !!receiverId) {
                // Check if a chat already exists with the receiver
                const chatQuery = await db.collection('chats')
                    .where('user1', 'in', [currentUserId, receiverId])
                    .where('user2', 'in', [currentUserId, receiverId])
                    .get();

                if (!chatQuery.empty) {
                    setChatID(chatQuery.docs[0].id);
                }
                else {
                    setChatID(await createNewChat());
                }
            }

            const unsubscribe = db.collection('chats')
                .doc(chatID)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    const fetchedMessages = snapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            _id: doc.id,
                            text: data.text,
                            createdAt: data.timestamp ? data.timestamp.toDate() : new Date(),
                            user: { _id: data.user_uid, }
                            // profile_picture: data.user_profile_picture, // Assuming user data includes an avatar URL
                        };
                    });
                    setMessages(fetchedMessages);
                });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        };

        fetchChat(); // Fetch or create the chat

        fetchProfile(receiverId); // Fetch the receiver's profile
    }, [chatID, receiverId]); // Update messages when chatID or receiverId changes

    // Send a message to Firestore
    const onSend = (newMessages = []) => {
        const message = newMessages[0];
    
        // Create a local timestamp for immediate UI feedback
        const localTimestamp = new Date();
    
        // Prepare message data for Firestore
        const messageData = {
            text: message.text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Server timestamp for Firestore
            user_uid: currentUserId, // Store the current user's ID
        };
    
        // Update local messages state immediately
        setMessages(previousMessages => GiftedChat.append(previousMessages, [{
            _id: message._id, // Use existing message ID
            text: message.text,
            createdAt: localTimestamp, // Use local timestamp for immediate display
            user: { _id: currentUserId }, // Include user info here
        }]));
    
        // Add the new message to the messages sub-collection
        db.collection('chats')
            .doc(chatID)
            .collection('messages')
            .add(messageData)
            .then(docRef => {
                // On success, update the message with Firestore's server timestamp
                return docRef.update({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add createdAt field to the message
                });
            })
            .then(() => {
                // Update last message in chat document
                return db.collection('chats')
                    .doc(chatID)
                    .set({
                        lastMessageTimestamp: messageData.timestamp,
                        lastMessage: message.text, // Store the last message text
                    }, { merge: true }); // Merge to keep existing data
            })
            .catch(error => {
                console.error("Error sending message: ", error);
            });
        };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Image source={{ uri: receiver_pfp }} style={styles.story} />
                <Text style={styles.usernameText}>Chat with {receiver_username}</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{_id: currentUserId}}
            />
            <BottomTabs />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    usernameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
});

export default ChatScreen;
