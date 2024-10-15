import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { bottomTabIcons } from '../home/bottomTabIcons'; // Adjust the path as necessary
import Ionicons from '@expo/vector-icons/Ionicons'; // Using Ionicons for the icons

import { useNavigation } from '@react-navigation/native';

const BottomTabs = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Home'); // Setting the default active tab to Home

    const Icon = ({ icon }) => (
        <TouchableOpacity 
            onPress={() => {
                if (icon.name === 'Post') {
                    navigation.navigate('NewPostScreen'); // Navigate to NewPostScreen
                } else {
                    setActiveTab(icon.name); // Set active tab for other icons
                }
            }} 
            style={styles.iconContainer}
        >
            <Ionicons
                name={activeTab === icon.name ? icon.active : icon.inactive}
                size={30}
                color={activeTab === icon.name ? '#A2C2E6' : 'black'} // Change color based on active state
            />
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
        padding: 9, // Adjusted for better spacing
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    iconContainer: {
        alignItems: 'center',
    },
});

export default BottomTabs;
