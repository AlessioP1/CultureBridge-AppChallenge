import React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
<<<<<<< HEAD
=======
import { firebase, db } from '../../firebase';
import length from 'lodash/size';
import { useNavigation } from '@react-navigation/native';
>>>>>>> 4703a1acc2209cec72d29403bd6df8a01862bc51

const Post = ({ post, onBookmark }) => {
    return (
        <View>
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <PostFooter post={post} onBookmark={onBookmark} />
                <Caption post={post} />
                <CommentsSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    );
};

const PostHeader = ({ post }) => {
<<<<<<< HEAD
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
=======
    const navigation = useNavigation();
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
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { receiverId: post.owner_uid })}>
            <Text style={styles.usernameText}>
            {post.username}
            </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: 'black', fontWeight: '900' }}>...</Text>
    </View>
  );
>>>>>>> 4703a1acc2209cec72d29403bd6df8a01862bc51
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

const PostFooter = ({ post, onBookmark }) => (
    <View style={styles.footerContainer}>
        <View style={styles.leftFooterIcons}>
            {/* Bookmark icon */}
            <TouchableOpacity onPress={() => onBookmark(post.id)}>
                <Ionicons name="bookmark-outline" size={30} color="black" />
            </TouchableOpacity>

            {/* Comment icon */}
            <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={30} color="black" />
            </TouchableOpacity>
        </View>
    </View>
);

const Caption = ({ post }) => (
    <View>
        <Text>{post.caption}</Text>
    </View>
);

const CommentsSection = ({ post }) => (
    <View>
        <Text>View all {post.comments.length} comments</Text>
    </View>
);

const Comments = ({ post }) => (
    <View>
        {post.comments.map((comment, index) => (
            <Text key={index}>{comment.text}</Text>
        ))}
    </View>
);

const styles = {
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501',
    },
    usernameText: {
        marginLeft: 5,
        fontWeight: '700',
        color: 'black',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    leftFooterIcons: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
    },
};

export default Post;