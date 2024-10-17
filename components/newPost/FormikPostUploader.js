import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import { db, firebase } from '../../firebase';

const PLACEHOLDER_IMG = 'https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg';

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url('Image URL must be a valid URL').required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit'),
});

const FormikPostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    // Function to get username and profile picture from Firestore
    function getUsername(uid) {
        const unsubscribe = db
            .collection('users')
            .where('owner_uid', '==', uid)
            .onSnapshot(
                snapshot => {
                    if (!snapshot.empty) {
                        snapshot.docs.map(doc => {
                            setCurrentLoggedInUser({
                                username: doc.data().username,
                                profilePicture: doc.data().profile_picture
                            });
                        });
                    } else {
                        console.error("No user data found for the current user. UID: ", uid);
                    }
                },
                error => {
                    console.error("Error fetching user data:", error);
                }
            );

        return unsubscribe;
    }

    // Effect to listen for authentication state changes
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User logged in:", user.uid);
                getUsername(user.uid); // Pass the user ID to fetch additional user info from Firestore
            } else {
                console.error('No user is logged in.');
            }
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    const uploadPostToFirebase = (imageUrl, caption) => {
        if (!currentLoggedInUser) {
            console.error("User data is not loaded yet.");
            return;
        }

        const unsubscribe = db
            .collection('user')
            .doc(firebase.auth().currentUser.email)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
                username: currentLoggedInUser.username, // Ensure username exists
                profile_picture: currentLoggedInUser.profilePicture,
                owner_uid: firebase.auth().currentUser.uid,
                owner_email: firebase.auth().currentUser.email,
                caption: caption,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                comments: [],
            })
            .then(() => navigation.goBack())
            .catch((error) => console.error("Error posting to Firebase: ", error));

        return unsubscribe;
    }

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imageUrl, values.caption);
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, touched, isValid }) => (
                <>
                    <View 
                        style={{
                            margin: 20,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}
                    >
                        <Image 
                            source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }} 
                            style={{ width: 100, height: 100 }} 
                        />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput 
                                style={{ color: 'black', fontSize: 20 }}
                                placeholder='Write a caption...' 
                                placeholderTextColor='gray'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <Divider width={0.2} orientation='vertical' />
                    <TextInput 
                        onChange={e => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: 'black', fontSize: 18 }}
                        placeholder='Enter Image Url' 
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {touched.imageUrl && errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <TouchableOpacity 
                        onPress={handleSubmit} 
                        style={{
                            padding: 15,
                            marginTop: 30, // Increased margin to lower the button
                            alignItems: 'center',
                        }}
                        disabled={!isValid}
                    >
                        <Text style={{ color: isValid ? 'green' : 'lightgray', fontSize: 18 }}>
                            Upload Entry
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </Formik>
    );
};

export default FormikPostUploader;

