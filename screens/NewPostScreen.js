import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native';
import AddNewPost from '../components/newPost/AddNewPost'

const NewPostScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { hubId, resourceId } = route.params; // Access the hubId parameter passed from the Hub screen, each resourceId is related to the homescreen
  return (
    <SafeAreaView style = {{ backgroundColor: 'white', flex: 1 }}>
      <AddNewPost navigation={navigation} hubId={hubId} resourceId={resourceId}/>
    </SafeAreaView>
  )
}

export default NewPostScreen