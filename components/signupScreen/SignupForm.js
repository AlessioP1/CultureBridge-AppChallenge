import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { firebase, db } from '../../firebase'

const SignupForm = ({navigation}) => {
    // Validation schema for the signup form
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required('A username is required').min(3, 'Your username has to have at least 3 characters'),
        password: Yup.string().required('A password is required').min(6, 'Your password has to have at least 6 characters'),
    })


    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api/')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async(email, password, username) => {
        try {
            // Create user with email and password using Firebase authentication
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
    
            // Immediately add the user data to Firestore
            await db.collection('users')
                .doc(authUser.user.uid) // Use the UID as the document ID
                .set({
                    owner_uid: authUser.user.uid,  // Store the user's UID
                    username: username,
                    email: authUser.user.email,    // Store the user's email
                    profile_picture: await getRandomProfilePicture()  // Get random profile picture
                });

                console.log(user.uid), // Log the user's UID
    
            console.log("Firebase signup successful:", email, password);
        } catch (error) {
            Alert.alert('Error', error.message); // Display error message if something goes wrong
        }
    };
    

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={values => {
                    onSignup(values.email, values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        {/* Email Input */}
                        <View style={[styles.inputField,
                            { borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red' },
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                autoFocus={true}
                                style={styles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>

                        {/* Username Input */}
                        <View style={[styles.inputField,
                            { borderColor: values.username.length < 1 || values.username.length >= 3 ? '#ccc' : 'red' },
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Username'
                                autoCapitalize='none'
                                style={styles.textInput}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={[styles.inputField,
                            { borderColor: values.password.length < 1 || values.password.length >= 6 ? '#ccc' : 'red' },
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

                        {/* Forgot Password link (optional for signup, could be removed) */}
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </View>

                        {/* Signup button */}
                        <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>

                        {/* Redirect to Login */}
                        <View style={styles.signupContainer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: '#0096F6', fontWeight: 'bold' }}> Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

// Styling for the Signup Form
const styles = StyleSheet.create({
    inputField: {
        borderRadius: 4,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        width: 350,
        backgroundColor: '#FAFAFA',
    },
    wrapper: {
        alignItems: 'center',
        marginTop: 50,
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
        color: '#6BB0F5',
        fontSize: 14,
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#A4C8F9',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        width: 350,
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
})

export default SignupForm
