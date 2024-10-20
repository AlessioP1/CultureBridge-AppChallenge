import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import NewPostScreen from './screens/NewPostScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import EducationScreen from './screens/EducationScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import InfoScreen from './screens/InfoScreen';
import Resource1 from './screens/Resource1';
import Resource2 from './screens/Resource2';
import Resource3 from './screens/Resource3';
import Resource4 from './screens/Resource4';
import Resource5 from './screens/Resource5';
import Resource6 from './screens/Resource6';
import Hub1 from './screens/Hub1';
import Hub2 from './screens/Hub2';
import Hub3 from './screens/Hub3';
import Hub4 from './screens/Hub4';
import AIChatgptText from './screens/AIChatgptText';
import ChatListScreen from './screens/ChatListScreen'
import ChatScreen from './screens/ChatScreen'

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
}

export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='EducationScreen' component={EducationScreen} />
            <Stack.Screen name='AIChatgptText' component={AIChatgptText} />
            <Stack.Screen name='BookmarkScreen' component={BookmarkScreen} />
            <Stack.Screen name='InfoScreen' component={InfoScreen} />
            <Stack.Screen name='Resource1' component={Resource1} />
            <Stack.Screen name='Resource2' component={Resource2} />
            <Stack.Screen name='Resource3' component={Resource3} />
            <Stack.Screen name='Resource4' component={Resource4} />
            <Stack.Screen name='Resource5' component={Resource5} />
            <Stack.Screen name='Resource6' component={Resource6} />
            <Stack.Screen name='Hub1' component={Hub1} />
            <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
            <Stack.Screen name='Hub2' component={Hub2} />
            <Stack.Screen name='Hub3' component={Hub3} />
            <Stack.Screen name='Hub4' component={Hub4} />
            <Stack.Screen name='ChatListScreen' component={ChatListScreen} />
            <Stack.Screen name='ChatScreen' component={ChatScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignupScreen' component={SignupScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);