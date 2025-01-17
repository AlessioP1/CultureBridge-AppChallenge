import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostImage from './PostImage';
import BookmarkButton from './BookmarkButton';
import ChatScreen from '../../screens/ChatScreen';
import { useNavigation } from '@react-navigation/native';

const Post = ({ post, onDelete }) => (
  <View style={styles.postContainer}>
    <PostHeader post={post} />
    <PostImage post={post} />
    <View style={styles.contentContainer}>
      <Caption caption={post.caption} />
      <CommentsSection commentsCount={post.comments.length} />
      <Comments comments={post.comments} />
    </View>
    <PostFooter post={post} onDelete={onDelete} />
  </View>
);

const PostHeader = ({ post }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
            <Image source={{ uri: post.profile_picture }} style={styles.story} />
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', {receiverId: post.owner_uid})}>
                <Text style={styles.usernameText}>{post.username}</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.headerRight}>...</Text>
        </View>
    );
};


const PostFooter = ({ post, onDelete }) => (
  <View style={styles.footerContainer}>
    <View style={styles.leftFooterIcons}>
      <BookmarkButton post={post} />
      <TouchableOpacity onPress={() => onDelete(post.id)}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  </View>
);

const Caption = ({ caption }) => (
  <Text style={styles.captionText}>{caption}</Text>
);

const CommentsSection = ({ commentsCount }) => (
  <Text style={styles.commentsSectionText}>
    View all {commentsCount} comments
  </Text>
);

const Comments = ({ comments }) => (
  <View>
    {comments.map((comment, index) => (
      <Text key={index} style={styles.commentText}>
        <Text style={styles.commentUsername}>{comment.username}</Text> {comment.text}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  usernameText: {
    marginLeft: 2,
    fontWeight: '700',
    color: 'black',
  },
  headerRight: {
    color: 'black',
    fontWeight: '900',
  },
  imageContainer: {
    width: '100%',
    height: 1,
  },
  image: {
    height: '50%',
    resizeMode: 'cover',
  },
  contentContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftFooterIcons: {
    flexDirection: 'row',
  },
  captionText: {
    flexDirection: 'row',
    color: 'black',
  },
  commentsSectionText: {
    color: 'gray',
  },
  commentText: {
    color: 'black',
  },
  commentUsername: {
    fontWeight: '700',
  },
});

export default Post;