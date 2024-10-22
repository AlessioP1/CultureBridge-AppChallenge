import { View, Text, TextInput, Image, Button, StyleSheet,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { db, auth, storage, firebase } from '../../firebase'; // Import Firebase services

const FormikPostUploader = ({ navigation, hubId, resourceId }) => {
    
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

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
        const unsubscribe = auth.onAuthStateChanged((user) => {
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

    const selectImage = async () => {
      console.log("Selecting image...");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
        if (!result.canceled) {
          const source = {
            uri: result.assets[0].uri,
            name: result.assets[0].fileName || `image_${Date.now()}`,
            type: result.assets[0].type,
          };
          setSelectedImage(source);
        } else {
          console.error('Image selection was canceled');
        }
      };

    const uploadFileToFirebaseStorage = async (file) => {
        const response = await fetch(file.uri);
        const blob = await response.blob();
        //const storageRef = storage.ref();
        const storageRef = storage.ref();
        console.log("storageRef: ",storageRef );
        const fileRef = storageRef.child(`images/${file.name}`);
        await fileRef.put(blob);
        const fileUrl = await fileRef.getDownloadURL();
        console.log("url: ",fileUrl );
        return fileUrl;
      };

    const uploadPostToFirebase = async (file, caption) => {
        if (!currentLoggedInUser) {
            console.error("User data is not loaded yet.");
            return;
        }
        let fileUrl = null;
            if (file) {
              try {
                fileUrl = await uploadFileToFirebaseStorage(file);
                console.log("File uploaded to Firebase Storage:", fileUrl);
              } catch (error) {
                console.error("Error uploading file to Firebase Storage:", error);
              }
            }
        try {
            
            console.log("post to be added: ", resourceId, "|",  hubId, "|", fileUrl, "|", caption);        

            await db.collection('resources')
                .doc(resourceId)
                .collection('hubs')
                .doc(hubId)
                .collection('posts')
                .add({
                imageUrl: fileUrl,
                username: currentLoggedInUser.username, // Ensure username exists
                profile_picture: currentLoggedInUser.profilePicture,
                owner_uid: auth.currentUser.uid,
                owner_email: auth.currentUser.email,
                caption: caption,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                comments: [],
                });
            navigation.goBack();
        } catch (error) {
            console.error("Error posting to Firebase:", error);
        }
  };

    return (
    <Formik
            initialValues={{ caption: '' }}
            onSubmit={(values) => {
                uploadPostToFirebase(selectedImage, values.caption);
            }}
            validationSchema={Yup.object().shape({
                caption: Yup.string().max(2200, 'Caption has reached the character limit.'),
            })}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              placeholder="Write a caption..."
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
              value={values.caption}
              multiline={true}
              style={styles.inputField}
            />
            {touched.caption && errors.caption && <Text style={styles.errorText}>{errors.caption}</Text>}
            <TouchableOpacity onPress={selectImage} style={styles.selectImageButton}>
                <Text style={styles.selectImageText}>Select Image</Text>
            </TouchableOpacity>
            {selectedImage && (
                <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
            )}
            <Button onPress={handleSubmit} title="Submit post" />
          </View>
        )}
      </Formik>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      errorText: {
        color: 'red',
        marginBottom: 10,
      },
      selectImageButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      selectImageText: {
        color: '#fff',
        textAlign: 'center',
      },
      selectedImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
      },
  });

export default FormikPostUploader;

