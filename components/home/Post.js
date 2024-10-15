import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';

// Icons Constant
const icons = {
  like: {
    name: 'heart-outline', // default state icon
    likedName: 'heart',     // icon when liked
    imageUrl: 'https://img.icons8.com/ios/50/000000/like.png', // image for like
    likedImageUrl: 'https://img.icons8.com/ios-filled/50/fa314a/like.png', // image for liked
  },
  comment: {
    name: 'chatbubble-outline',
  },
  share: {
    name: 'share-social-outline',
  },
  save: {
    name: 'bookmark-outline',
  },
};

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style = {{marginHorizontal: 10, marginTop: 10}}>
        <PostFooter />
        <Likes post={post} />
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
          {post.user}
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

const PostFooter = () => (
  <View style={styles.footerContainer}>
    <View style={styles.leftFooterIcons}>
      <TouchableOpacity >
        <Ionicons name={icons.like.name} size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name={icons.comment.name} size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name={icons.share.name} size={30} color="black" />
      </TouchableOpacity>
    </View>
    <TouchableOpacity>
      <Ionicons name={icons.save.name} size={30} color="black" />
    </TouchableOpacity>
  </View>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: -4}}>
    <Text style={{ color: "black", fontWeight: '600', marginLeft: 2 }}>
      {post.likes.toLocaleString('en')} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{marginTop: 5}}>
    <Text style={{ color: 'black' }}>
      <Text style={{ fontWeight: '600' }}>
        {post.user}
      </Text> {/* Username in bold */}
      {' '} {/* Space between the username and caption */}
      {post.caption} {/* Display the caption */}
    </Text>
  </View>
);

const CommentsSection = ({post}) => (
  <View style={{marginTop: 5}}>
    {!!post.comments.length && (
        <Text style={{color: 'grey'}}>
          View{post.comments.length > 1 ? ' all' : ''} {post.comments.length} {''}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
    )}
    </View>
)

const Comments = ({post}) => (
  <>
  {post.comments.map((comment, index) => (
    <View key={index} style ={{flexDirection: 'row', marginTop: 5}}>
        <Text style={{color: 'black'}}>
            <Text style = {{fontWeight: '600'}}>{comment.user}</Text>
            {' '} {comment.comment}
        </Text>
    </View>
  ))}
  </>
)


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
