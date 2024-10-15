import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import LoginForm from '../components/loginScreen/LoginForm';

const LoginScreen = ({ navigation }) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image 
                source={require('../assets/CultureBridgeLogo2.jpg')} // Correct path
                style={styles.logo}
            />
        </View>
        <View style={styles.formContainer}>
            <LoginForm navigation = {navigation}/>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', 
        paddingTop: 50,  
        paddingHorizontal: 12,
    },
    
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
        justifyContent: 'center',
        
    },
    logo: {
        width: 150,   // Adjust width to fit your design
        height: 200,  // Adjust height to fit your design
        resizeMode: 'contain', // Makes sure the image scales properly
    },
    formContainer: {
        width: '80%',  // Set width for form section to be responsive
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 18,
        color: '#aaa', // Placeholder color
    },
});

export default LoginScreen;
