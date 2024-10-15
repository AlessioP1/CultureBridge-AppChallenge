import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import SignupForm from '../components/signupScreen/SignupForm'; // Adjusted the path

// Use require to import the image correctly
const CULTUREBRIDGE_LOGO = require('../assets/CultureBridgeLogo2.jpg')

const SignupScreen = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={CULTUREBRIDGE_LOGO} style={{ height: 100, width: 100 }} />
        </View>
        <SignupForm navigation = {navigation}/>
    </View>
)

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
})

export default SignupScreen
