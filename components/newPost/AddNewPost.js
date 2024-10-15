import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import FormikPostUploader from './FormikPostUploader';

const AddNewPost = ({ navigation }) => (
    <View style={styles.container}>
        <Header navigation={navigation} />
        <FormikPostUploader navigation = {navigation}/>
    </View>
);

const Header = ({ navigation }) => (
    <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/90/000000/back.png' }} // Changed to black icon
                style={{ width: 30, height: 30 }}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW ENTRY</Text>
        <Text></Text>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 25,
    },
});

export default AddNewPost;
