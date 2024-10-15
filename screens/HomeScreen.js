import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs from '../components/home/BottomTabs'
import { bottomTabIcons } from '../components/home/BottomTabs'

const HomeScreen = ( {navigation} ) => {
  return (
    <SafeAreaView style={styles.container}>
        <Header navigation={navigation}/>
        <ScrollView>
          {POSTS.map((post, index) => (
          <Post post={post} key={index} />
          ))}
        </ScrollView>
       <BottomTabs icons={bottomTabIcons} navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
        container: {
        backgroundColor: 'white',
        flex: 1,
        },
    })

export default HomeScreen