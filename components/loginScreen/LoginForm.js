import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { firebase } from '../../firebase'; // Updated import

const LoginForm = ({navigation}) => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have at least 6 characters')
    });

    const onLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log("Firebase login successful", email, password);
            // navigation.navigate('HomeScreen');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={values => {
                    onLogin(values.email, values.password);
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                    <>
                        <View style={[styles.inputField,
                            {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'},
                        ]}>
                            <TextInput 
                                placeholderTextColor='#444'
                                placeholder='Phone number, username, or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                style={styles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        
                        <View style={[styles.inputField,
                            {borderColor: values.password.length < 1 || values.password.length > 6 ? '#ccc' : 'red'},
                        ]}>
                            <TextInput 
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true} 
                                textContentType='password'
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>

                        {/* Forgot Password link */}
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </View>
                        
                        {/* Login button */}
                        <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                <Text style={{color: '#0096F6', fontWeight: 'bold'}}> Sign up</Text>
                            </TouchableOpacity>    
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 4,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        width: 350, // Fix the width of the input fields
        backgroundColor: '#FAFAFA', // Change the background color of the input fields
        marginLeft: 75,
    },
    wrapper: {
        alignItems: 'center', // Horizontally center the elements
        marginTop: 50, // Adjust the top margin to place it under the logo
    },
    textInput: {
        width: '100%', // Ensure the text input takes up the full width of the input field
    },
    // Forgot Password styling
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginRight: 0, // Adjust right margin to position "Forgot Password?" text
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#6BB0F5',
        fontSize: 14,
    },
    // Button styling
    button: (isValid) => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        width: 350, // Make the login button wider
        marginLeft: 75,
    }),
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    },
});

export default LoginForm;
