import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PostImage = ({ post }) => (
  <View style={styles.imageContainer}>
    <Image source={{ uri: post.imageUrl }} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default PostImage;