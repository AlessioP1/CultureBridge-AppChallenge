import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Dropdown = ({ title, icon, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={toggleDropdown}>
                <View style={styles.row}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.title}>{title}</Text>
                    <Ionicons 
                        name={isOpen ? "chevron-down" : "chevron-forward"} 
                        size={20} 
                        color="#333" 
                        style={styles.arrowIcon} 
                    />
                </View>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.contentContainer}>
                    <Text style={styles.content}>{content}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    titleContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Added to space out elements
    },
    title: {
        fontSize: 18,
        color: '#333', // Normal text
        marginLeft: 10,
        flex: 1, // Allow title to take available space
    },
    icon: {
        width: 30,
        height: 30,
    },
    arrowIcon: {
        marginLeft: 10,
    },
    contentContainer: {
        padding: 15,
    },
    content: {
        fontSize: 16,
        color: '#555',
    },
});

export default Dropdown;
