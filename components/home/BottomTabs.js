import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { bottomTabIcons } from '../home/bottomTabIcons'; // Adjust the path as necessary
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const BottomTabs = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [activeTab, setActiveTab] = useState('Home'); // Setting default active tab to 'Home'
    // const [unreadMessages, setUnreadMessages] = useState(3); // Simulated number of unread messages

    // Update the active tab based on the currently focused screen
    useFocusEffect(
        React.useCallback(() => {
            const routeName = route.name; // Get the current screen name
            switch (routeName) {
                case 'HomeScreen':
                    setActiveTab('Home');
                    break;
                case 'EducationScreen':
                    setActiveTab('Resources');
                    break;
                case 'AIChatgptText':
                    setActiveTab('logo-ionitron');
                    break;
                case 'ChatScreen':
                    setActiveTab('Chat');
                    break;
                case 'BookmarkScreen': // Changed from 'ProfileScreen' to 'BookmarkScreen'
                    setActiveTab('Bookmark');
                    break;
                default:
                    setActiveTab('Home'); // Fallback to 'Home' tab
                    break;
            }
        }, [route])
    );

    const Icon = ({ icon }) => (
        <TouchableOpacity
            onPress={() => {
                setActiveTab(icon.name); // Update the active tab state
                // Navigate to the corresponding screen
                switch (icon.name) {
                    case 'Resources':
                        navigation.navigate('EducationScreen');
                        break;
                    case 'Chat':
                        navigation.navigate('ChatListScreen');
                        break;
                    case 'Robot': // New button for Robot
                        navigation.navigate('AIChatgptText');
                        break;
                    case 'Bookmark': // Changed from 'Profile' to 'Bookmark'
                        navigation.navigate('BookmarkScreen'); // Changed from 'ProfileScreen' to 'BookmarkScreen'
                        break;
                    case 'Home':
                        navigation.navigate('HomeScreen');
                        break;
                    default:
                        break;
                }
            }}
            style={styles.iconContainer}
        >
            <Ionicons
                name={activeTab === icon.name ? icon.active : icon.inactive}
                size={30}
                color={activeTab === icon.name ? '#A2C2E6' : 'black'} // Change color based on active state
            />
            {/* {icon.name === 'Chat' && unreadMessages > 0 && (
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{unreadMessages}</Text>
                </View>
            )} */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {bottomTabIcons.map((icon, index) => (
                <Icon key={index} icon={icon} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 9,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    iconContainer: {
        alignItems: 'center',
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        borderRadius: 50,
        width: 18,  // Slightly reduced size for badge
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600',
    },
});

export default BottomTabs;
