import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs from '../components/home/BottomTabs'
import { bottomTabIcons } from '../components/home/BottomTabs'
import { firebase, db } from '../firebase'

const HomeScreen = ( {navigation} ) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({id: post.id, ...post.data() })));
    })
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
        <Header navigation={navigation}/>
        <ScrollView>
          {posts.map((post, index) => (
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