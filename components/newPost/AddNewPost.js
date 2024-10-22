import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import FormikPostUploader from './FormikPostUploader';

const AddNewPost = ({ navigation, hubId, resourceId }) => {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <FormikPostUploader navigation={navigation} hubId={hubId} resourceId={resourceId}/>
      </View>
    );
  };


const Header = ({ navigation }) => (
    <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/90/000000/back.png' }} // Changed to black icon
                style={{ width: 30, height: 30 }}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add New Post for Hub</Text>
        <Text></Text>
        <Image
        source={require('../../assets/LatinoHub.jpg')}
        style={styles.banner}
        resizeMode="cover"
        />
     
    </SafeAreaView>
    
);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'left',
    },

    headerText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 25,
    },
    banner: {
        width: '100%',
        height: 100,
        marginBottom: 10,
      },
});

export default AddNewPost;
