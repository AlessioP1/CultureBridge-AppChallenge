import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TextOutput, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // For navigation
import sendChatRequest from '../components/AIChatgpttext/AIChatgptTextComponents';

const AIChatgptText = () => {
  const navigation = useNavigation(); // Navigation hook to go back
  const [message, setMessage] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const chatRole = 'You are a helpful assistant';

  const sendChatMessage = async () => {
    // Add user message to the conversation
    setConversation([...conversation, { role: 'user', content: message }]);
    

    // Send the user message to ChatGPT API
    const botMessage = await sendChatRequest(message, chatRole);
    if (botMessage) {
      // Add bot message to conversation
      setConversation((prevConversation) => [...prevConversation, { role: 'bot', content: botMessage }]);
    } else {
      // Handle error case
      setConversation((prevConversation) => [...prevConversation, { role: 'bot', content: 'Failed to get a response from the server.' }]);
    }
    // Clear the input field
    setMessage('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Arrow */}
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chat Hub</Text>
        </View>
      </SafeAreaView>

      {/* Banner Image */}
      <Image
        source={require('../assets/chatgptscreen.jpg')} // Adjust the path based on your folder structure
        style={styles.banner}
        resizeMode="cover" // Ensures the image covers the width while keeping the aspect ratio
      />

      {/* Hub Content */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Welcome to the Chat area! Here you can find various information.</Text>
      </View>
      <View style={styles.chatArea}>
        {conversation.map((msg, index) => (
          <Text key={index} style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.content}
          </Text>
        ))}
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendChatMessage} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  banner: {
    width: '100%', // Full width of the screen
    height: 100, // Adjust the height as needed for the banner
    marginBottom: 5, // Space between the banner and the rest of the content
  },
  content: {
    padding: 15,
  },
  contentText: {
    fontSize: 16,
    color: '#555',
  },
  //container: {
  //  flex: 1,
  //},
  chatArea: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    minHeight: 300,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginRight: 16,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  userMessage: {
    textAlign: 'right',
    color: 'blue',
  },
  botMessage: {
    textAlign: 'left',
    color: 'green',
  },
  //postsContainer: {
  //  padding: 15,
  //},
  
});

export default AIChatgptText;

