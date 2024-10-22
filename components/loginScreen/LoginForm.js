import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
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
                        
                        {/* Login button with TouchableOpacity for fade animation */}
                        <TouchableOpacity 
                            style={styles.button(isValid)} 
                            onPress={handleSubmit} 
                            activeOpacity={0.6} // Add fade-in effect on press
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>

                        <View style={styles.signupContainer}>
                            <Text style ={{color: '#C4A484'}}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                <Text style={{color: '#E9967A', fontWeight: 'bold'}}> Sign up</Text>
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
        width: 350, 
        backgroundColor: '#FAFAFA', 
        marginLeft: 75,
    },
    wrapper: {
        alignItems: 'center', 
        marginTop: 20,  
    },
    textInput: {
        width: '100%', 
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginRight: 0, 
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#C4A484',
        fontSize: 14,
    },
    button: (isValid) => ({
        backgroundColor: isValid ? '#D6C69D' : '#9C9B95',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        width: 350, 
        marginLeft: 75,
        // Add a slight shadow to give a 3D effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Android shadow
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
        marginTop: 30,  
    },
});

export default LoginForm;

