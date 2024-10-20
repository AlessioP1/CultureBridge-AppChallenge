import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from 'react-native'; // Import Dimensions to get screen width

const InfoScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Arrow */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Info Screen</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Info Content */}
                <Text style={styles.infoText}>
                    This app was created to help provide resources for local communities.
                </Text>

                {/* Header Text for Challenges */}
                <Text style={styles.challengesHeader}>
                    Immigrants who arrive in the US consistently face 6 challenges
                </Text>

                {/* Grid of Images (1 column, 6 rows) */}
                <View style={styles.imageGrid}>
                    <View style={styles.imageRow}>
                        <Image source={require('../assets/localCommunity.png')} style={styles.largeImage} resizeMode="contain" />
                        <Text style={styles.imageDescription}>Supports local initiatives and community building.</Text>
                    </View>
                    <View style={styles.imageRow}>
                        <Image source={require('../assets/employment.png')} style={styles.largeImage} resizeMode="contain" />
                        <Text style={styles.imageDescription}>Connects users to job opportunities in their area.</Text>
                    </View>
                    <View style={styles.imageRow}>
                        <Image source={require('../assets/financialResources.png')} style={styles.largeImage} resizeMode="contain" />
                        <Text style={styles.imageDescription}>Provides access to essential financial information.</Text>
                    </View>
                    <View style={styles.imageRow}>
                        <Image source={require('../assets/healthcare.png')} style={styles.largeImage} resizeMode="contain" />
                        <Text style={styles.imageDescription}>Provides access to essential healthcare information.</Text>
                    </View>
                    <View style={styles.imageRow}>
                        <Image source={require('../assets/language.png')} style={styles.largeImage} resizeMode="contain" />
                        <Text style={styles.imageDescription}>Offers information in multiple different languages.</Text>
                    </View>
                    <View style={styles.imageRow}>
                        <Image source={require('../assets/transportation.png')} style={styles.largeImage} resizeMode="contain" />
                        <Text style={styles.imageDescription}>Helps users navigate local transportation options.</Text>
                    </View>
                </View>

                {/* Larger Image (listOfPros2.png) with its own style */}
                <Text style={styles.largeImageText}>Key Benefits</Text>
                <Image source={require('../assets/listOfPros2.png')} style={styles.largeImageCustom} resizeMode="contain" />
                
                {/* Key Benefits Comparison */}
                <Text style={styles.comparisonText}>
                    Our Culture Bridge App stands out by providing tailored resources that connect users directly to their local communities, unlike broader platforms such as Facebook and Uber, which focus more on social networking and ride-sharing. Duolingo offers language learning but lacks comprehensive local resource integration. Bank of America serves financial needs but doesn't provide community engagement features. Culture Bridge prioritizes cultural connection and accessibility, making it a unique and valuable tool for community empowerment.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Consistent background color
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    contentContainer: {
        paddingHorizontal: 15,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 20,
    },
    challengesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center', // Center align the header
        color: '#333', // Color for header text
    },
    imageGrid: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageRow: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15, // Space between rows
    },
    largeImage: {
        width: 250,  // Original width for regular images
        height: 150, // Original height for regular images
        marginBottom: 5, // Space between image and description
        borderRadius: 20, // More rounded corners for a bubbly look
    },
    largeImageCustom: {
        width: Dimensions.get('window').width * 0.9, // Set width to 90% of screen width
        height: 250, // Keep a fixed height for better appearance
        marginBottom: 10, // Space below the image
        borderRadius: 20, // More rounded corners for a bubbly look
        alignSelf: 'center', // Center the image horizontally
    },
    imageDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
        paddingHorizontal: 5,
    },
    largeImageText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    comparisonText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginTop: 20,
        textAlign: 'justify', // Justify text for better readability
    },
});

export default InfoScreen;
