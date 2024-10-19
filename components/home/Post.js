import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebase, db } from '../../firebase';
import length from 'lodash/size';

// Icons Constant
const icons = {
  bookmark: {
    name: 'bookmark-outline',
  },
  comment: {
    name: 'chatbubble-outline',
  },
  share: {
    name: 'share-social-outline',
  },
};

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <PostFooter post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image 
          source={{ uri: post.profile_picture }} 
          style={styles.story} 
        />
        <Text style={styles.usernameText}>
          {post.username}
        </Text>
      </View>
      <Text style={{ color: 'black', fontWeight: '900' }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => (
  <View
    style={{
      width: '100%',
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', resizeMode: 'cover' }}
    />
  </View>
);

const PostFooter = ({ post }) => (
  <View style={styles.footerContainer}>
    <View style={styles.leftFooterIcons}>
      {/* Bookmark icon now first */}
      <TouchableOpacity>
        <Ionicons name={icons.bookmark.name} size={30} color="black" />
      </TouchableOpacity>

      {/* Comment icon */}
      <TouchableOpacity>
        <Ionicons name={icons.comment.name} size={30} color="black" />
      </TouchableOpacity>

      {/* Share icon */}
      <TouchableOpacity>
        <Ionicons name={icons.share.name} size={30} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: 'black' }}>
      <Text style={{ fontWeight: '600' }}>
        {post.username}
      </Text>{' '}
      {post.caption}
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'grey' }}>
        View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: 'black' }}>
          <Text style={{ fontWeight: '600' }}>{comment.username}</Text>{' '}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  usernameText: {
    color: 'black', 
    fontWeight: '700', 
    marginLeft: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  leftFooterIcons: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
  },
});

export default Post;