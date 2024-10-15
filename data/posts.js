import { USERS } from './users';

export const POSTS = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    username: USERS[0].username, // Linking user from USERS array // CHANGED FROM USER TO USERNAME
    likes: 1243,
    caption: 'Enjoying the view from the top of the mountain! #nature #hiking',
    profile_picture: USERS[0].image, // Linking profile picture from USERS array
    comments: [
      {
        username: 'janedoe', // CHANGED FROM USER TO USERNAME
        comment: 'That looks amazing! Wish I could be there.',
      },
      {
        username: 'michael_smith', // CHANGED FROM USER TO USERNAME
        comment: 'Awesome photo!',
      },
    ],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f',
    username: USERS[1].username, // Linking user from USERS array // CHANGED FROM USER TO USERNAME
    likes: 1024,
    caption: 'Coffee time ☕️ #morningroutine',
    profile_picture: USERS[1].image, // Linking profile picture from USERS array
    comments: [
      {
        username: 'emily_clark',// CHANGED FROM USER TO USERNAME
        comment: 'I need a coffee too!',
      },
    ],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    username: USERS[2].username, // Linking user from USERS array // CHANGED FROM USER TO USERNAME
    likes: 852,
    caption: 'Just adopted this cute little puppy! 🐶 #puppylove',
    profile_picture: USERS[2].image, // Linking profile picture from USERS array
    comments: [
      {
        username: 'johndoe', // CHANGED FROM USER TO USERNAME
        comment: 'What a cutie!',
      },
      {
        username: 'janedoe', //CHANGED FROM USER TO USERNAME
        comment: 'Adorable!',
      },
    ],
  },
];
