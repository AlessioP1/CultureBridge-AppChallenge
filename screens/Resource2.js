import { View, Text, Button, TextInput, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import BottomTabs from '../components/home/BottomTabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { bottomTabIcons } from '../components/home/BottomTabs';
import { useIsFocused } from '@react-navigation/native';
import { firebase, db } from '../firebase';
import sendChatRequest from '../components/AIChatgpttext/AIChatgptTextComponents';
import Dropdown from '../components/education/Dropdown'; // Adjust the path based on your structure


const Resource2 = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const resourceId= 'resource2';
  const chatRole = 'You are a financial advisor';
  const imageLocation ='../assets/Financial2.png';
  const headerTextForPage = 'Financial Resources';
  const askMeAnything = 'Ask Anything!';

  // reminder: 
  // LocalCommunity: 'Resource1',
  // Financial: 'Resource2',
  // Healthcare: 'Resource3',
  // Employment: 'Resource4',
  // Transportation: 'Resource5',
  // Language: 'Resource6',

  useEffect(() => {
    const unsubscribe = db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })));
    });

    return () => unsubscribe();
  }, []);

  const navigateToHub = (hubName, resourceId) => {
    const hubMap = {
      Latino: 'Hub1',
      AsianHorizons: 'Hub2',
      AfroConnect: 'Hub3',
      Europe: 'Hub4',
      // Chat: 'ChatgptText'
    };
    navigation.navigate(hubMap[hubName], { resourceId });
    
  };

  // section for chatbot !!! 
  const [message, setMessage] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  

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

  // end of section for chatbot !!!

  const hubs = [
    { name: 'Latino', label: 'Latin American Hub', info: 'Explore the Latin American community.', symbol: '1' },
    { name: 'AsianHorizons', label: 'AAPI Hub', info: 'Connect with diverse Asian cultures.', symbol: '2' },
    { name: 'AfroConnect', label: 'African American Hub', info: 'Celebrate African and Afro-diaspora cultures.', symbol: '3' },
    { name: 'Europe', label: 'Europe Hub', info: 'Connect with Western and Eastern Europeans.', symbol: '4' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>


      <View style={styles.leftContent}>
            <View style={styles.iconContent}>
              <Image source={require(imageLocation)} style={styles.resourceImage} />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.sectionHeader}>{headerTextForPage}</Text>
            </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
  {/* Hub Content */}
  <Text style={styles.sectionHeader}>Need Help? Contact Hub Below:</Text>
  {hubs.map((hub, index) => (
    <TouchableOpacity key={index} style={styles.hubRow} onPress={() => navigateToHub(hub.name, resourceId)}>
      <View style={styles.leftContent}>
        <View style={styles.iconContent}>
          <Text style={styles.hubSymbol}>{hub.symbol}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.hubLabel}>{hub.label}</Text>
          <Text style={styles.hubInfo}>{hub.info}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ))}

  {/* AI Chat Window */}
  {/* Banner Image */}
  <Image
    source={require('../assets/chatgptscreen.jpg')} // Adjust the path based on your folder structure
    style={styles.banner}
    resizeMode="cover" // Ensures the image covers the width while keeping the aspect ratio
  />
  
  <View style={styles.content}>
    <Text style={styles.sectionHeader}>{askMeAnything}</Text>
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
  <View style={styles.chatArea}>
    {conversation.map((msg, index) => (
      <Text key={index} style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
        {msg.content}
      </Text>
    ))}
  </View>
</ScrollView>
      <BottomTabs icons={bottomTabIcons} navigation={navigation} isFocused={isFocused} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 200,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    padding: 15,
  },
  contentText: {
    fontSize: 16,
    color: '#555',
  },
  chatArea: {
    padding: 16,
    // Change backgroundColor to white or remove it
    backgroundColor: 'white', // or 'transparent'
    minHeight: 200,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // Set the background color to white or remove it
    backgroundColor: 'white', // or 'transparent'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  userMessage: {
    backgroundColor: '#e1ffc7',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  botMessage: {
    backgroundColor: '#d0d0d0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  hubRow: {
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
  resourceImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginLeft: 10,
  },
  iconContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  hubSymbol: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
  },
  textContent: {
    flexDirection: 'column',
  },
  hubLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  hubInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    marginTop: 4,
  },
  headerText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginRight: 25,
  },
  headerText2: {
    padding: 2,
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
    marginRight: 25,
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
},
sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
},
bulletPoint: {
    fontSize: 16,          // Size of the bullet point text
    lineHeight: 24,        // Space between lines
    color: '#555',         // Color of the bullet point text
    marginBottom: 5,       // Space between bullet points
},
});

export default Resource2;


