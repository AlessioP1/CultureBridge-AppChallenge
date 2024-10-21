import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, firebase } from '../../firebase'; // Make sure firebase is properly set up

const BookmarkButton = ({ post }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const currentUserId = firebase.auth().currentUser.uid;

    // Check if the post is bookmarked by the user
    useEffect(() => {
        const checkBookmark = () => {
            const userRef = db.collection('users')
                .where('owner_uid', '==', currentUserId)
                .limit(1);
        
            const unsubscribeUser = userRef.onSnapshot(userSnapshot => {
                if (!userSnapshot.empty) {
                    const bookmarksRef = userSnapshot.docs[0].ref.collection('bookmarks');
                    
                    // Use onSnapshot to listen for changes in the bookmarks collection
                    const unsubscribeBookmark = bookmarksRef.doc(post.id).onSnapshot(bookmarkDoc => {
                        setIsBookmarked(bookmarkDoc.exists);
                    });
        
                    // Cleanup listener for bookmarks when the user document changes
                    return () => {
                        unsubscribeBookmark();
                    };
                } else {
                    console.error('No user found with the given owner_uid:', currentUserId);
                }
            });
        
            // Cleanup listener for user when the component unmounts or currentUserId changes
            return () => {
                unsubscribeUser();
            };
        };        

        checkBookmark();
    }, [post, currentUserId]);

    // Handle bookmarking and unbookmarking the post
    const onBookmark = async () => {
        setIsBookmarked(!isBookmarked); // Optimistically update the state

        const userSnapshot = await db.collection('users')
            .where('owner_uid', '==', currentUserId)
            .limit(1)
            .get();
    
        if (userSnapshot.empty) {
            console.error('No user found with the given owner_uid:', currentUserId);
            return;
        }
    
        const bookmarkRef = userSnapshot.docs[0].ref
            .collection('bookmarks')
            .doc(post.id);
    
        if (isBookmarked) {
            // If already bookmarked, remove the bookmark
            console.log('Unbookmarking post:', post.id);
            await bookmarkRef.delete();
        } else {
            // If not bookmarked, add it
            console.log('Bookmarking post:', post.id);
            await bookmarkRef.set({ ...post });
        }
    };
    

    return (
        <TouchableOpacity onPress={onBookmark}>
            <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={30}
                color="black"
            />
        </TouchableOpacity>
    );
};

export default BookmarkButton;
