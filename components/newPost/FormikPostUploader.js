import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';

const PLACEHOLDER_IMG = 'https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg';

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url('Image URL must be a valid URL').required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit'),
});

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                console.log(values);
                console.log('Your post has been uploaded successfully');
                navigation.goBack()
                // Optionally, reset the form after submission
                // resetForm(); // You can use resetForm to clear the inputs
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
