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

const Resource4 = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const resourceId = 'resource4';
  const chatRole = 'You are a employment advisor';
  const imageLocation = '../assets/Employment2.png';
  const headerTextForPage = 'Employment Resources';
  const askMeAnything = 'Ask Anything!';

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
    };
    navigation.navigate(hubMap[hubName], { resourceId });
  };

  // Chatbot state
  const [message, setMessage] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendChatMessage = async () => {
    setConversation([...conversation, { role: 'user', content: message }]);

    const botMessage = await sendChatRequest(message, chatRole);
    if (botMessage) {
      setConversation((prevConversation) => [...prevConversation, { role: 'bot', content: botMessage }]);
    } else {
      setConversation((prevConversation) => [...prevConversation, { role: 'bot', content: 'Failed to get a response from the server.' }]);
    }
    setMessage('');
  };

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
        <Image
          source={require('../assets/chatgptscreen.jpg')}
          style={styles.banner}
          resizeMode="cover"
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
  chatArea: {
    padding: 16,
    backgroundColor: 'white',
    minHeight: 200,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
});

export default Resource4;
