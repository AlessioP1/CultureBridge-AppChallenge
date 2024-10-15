import { USERS } from './users';

export const POSTS = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    user: USERS[0].username, // Linking user from USERS array
    likes: 1243,
    caption: 'Enjoying the view from the top of the mountain! #nature #hiking',
    profile_picture: USERS[0].image, // Linking profile picture from USERS array
    comments: [
      {
        user: 'janedoe',
        comment: 'That looks amazing! Wish I could be there.',
      },
      {
        user: 'michael_smith',
        comment: 'Awesome photo!',
      },
    ],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f',
    user: USERS[1].username, // Linking user from USERS array
    likes: 1024,
    caption: 'Coffee time ☕️ #morningroutine',
    profile_picture: USERS[1].image, // Linking profile picture from USERS array
    comments: [
      {
        user: 'emily_clark',
        comment: 'I need a coffee too!',
      },
    ],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    user: USERS[2].username, // Linking user from USERS array
    likes: 852,
    caption: 'Just adopted this cute little puppy! 🐶 #puppylove',
    profile_picture: USERS[2].image, // Linking profile picture from USERS array
    comments: [
      {
        user: 'johndoe',
        comment: 'What a cutie!',
      },
      {
        user: 'janedoe',
        comment: 'Adorable!',
      },
    ],
  },
];
