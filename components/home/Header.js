import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebase } from '../../firebase';

// Check if we really want this - its to sign out clicking the logo...

const handleSignout = async () => {
  try{
    await firebase.auth().signOut();
    console.log('Signed out successfully');
  } catch (error) {
    console.log('Error signing out: ', error);
  }}


const Header = ( {navigation} ) => {
  return (
    <View style={styles.container}>
      {/* Logo and "ulture Bridge" text on the left side */}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={handleSignout}>
          <Image 
            style={styles.logo} 
            source={require('../../assets/CultureBridgeLogo2.jpg')} 
          />
        </TouchableOpacity>
        <Text style={styles.logoText}>ulture Bridge</Text>
      </View>

      {/* Icons on the right side */}
      <View style={styles.iconsContainer}>

        {/* Messaging icon */}
        <TouchableOpacity onPress={() => console.log('Direct message pressed')}>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Ionicons name="chatbubbles-outline" size={28} color="black" style={styles.icon} />
        </TouchableOpacity>
        
        {/* Info icon */}
        <TouchableOpacity onPress={() => console.log('Info pressed')}>
          <Ionicons name="information-circle-outline" size={28} color="black" style={styles.icon} />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 8, // Reduced padding for more compact layout
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align text and logo vertically
  },
  logo: {
    width: 45,  // Reduced logo size for a compact feel
    height: 45,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 22,   // Slightly smaller font size for better proportion
    fontWeight: '600',  // Keep boldness for visibility
    marginLeft: 6,  // Reduced space between logo and text
    color: '#333',  // Dark gray text color for a modern look
    fontFamily: 'sans-serif-medium', // Elegant and modern font style
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 12, // Slightly less spacing between the icons
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    borderRadius: 50,
    width: 18,  // Slightly reduced size for badge
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10,  // Adjusted font size to fit smaller badge
  }
});

export default Header;
