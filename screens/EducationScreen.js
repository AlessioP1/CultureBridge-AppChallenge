import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Ensure you have this for navigation

const EducationScreen = () => {
  const navigation = useNavigation(); // Navigation hook to go back

  return (
    <ScrollView style={styles.container}>

      {/* Header with Back Arrow */}
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Financial Education Tips</Text>
        </View>
      </SafeAreaView>

      {/* Banner Image */}
      <Image
        source={require('../assets/EducationScreenBanner.jpg')} // Adjust the path based on your folder structure
        style={styles.banner}
        resizeMode="cover" // Ensures the image covers the width while keeping the aspect ratio
      />

      {/* Section 1: Building Credit Score */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>How to Build a Credit Score</Text>
        <Text style={styles.sectionContent}>
          Building a credit score is crucial for accessing loans, renting apartments, and even securing some jobs. Here are some tips:
        </Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bulletPoint}>• Pay your bills on time.</Text>
          <Text style={styles.bulletPoint}>• Apply for a secured credit card.</Text>
          <Text style={styles.bulletPoint}>• Keep your credit utilization below 30%.</Text>
          <Text style={styles.bulletPoint}>• Monitor your credit score regularly.</Text>
        </View>
      </View>

      {/* Section 2: Understanding Credit Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Understanding Credit Cards</Text>
        <Text style={styles.sectionContent}>
          Credit cards can be a powerful tool if used wisely. Here's what you need to know:
        </Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bulletPoint}>• Pay your balance in full every month.</Text>
          <Text style={styles.bulletPoint}>• Avoid cash advances.</Text>
          <Text style={styles.bulletPoint}>• Take advantage of rewards, but don't overspend.</Text>
        </View>
      </View>

      {/* Section 3: Other Financial Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Other Tips for Financial Stability</Text>
        <Text style={styles.sectionContent}>
          Here are additional tips to help you stay financially stable:
        </Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bulletPoint}>• Create a budget and stick to it.</Text>
          <Text style={styles.bulletPoint}>• Save a portion of your income each month.</Text>
          <Text style={styles.bulletPoint}>• Avoid unnecessary debts.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  banner: {
    width: '100%', // Full width of the screen
    height: 200, // Adjust the height as needed for the banner
    marginBottom: 20, // Space between the banner and the rest of the content
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
  section: {
    marginBottom: 30,
    paddingHorizontal: 15, // Padding for the sections to match the header padding
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  bulletPointContainer: {
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default EducationScreen;
