import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import NewPostScreen from './screens/NewPostScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import EducationScreen from './screens/EducationScreen';
import ProfileScreen from './screens/ProfileScreen';
import Hub1 from './screens/Hub1';  // Ensure these hub components exist
import Hub2 from './screens/Hub2';
import Hub3 from './screens/Hub3';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
}

export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
            <Stack.Screen name='EducationScreen' component={EducationScreen} />
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            {/* Ensure you have defined these hub screens */}
            <Stack.Screen name='Hub1' component={Hub1} />
            <Stack.Screen name='Hub2' component={Hub2} />
            <Stack.Screen name='Hub3' component={Hub3} />
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
