import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import { firebase } from './firebase'

function AuthNavigation() {
    const [currentUser, setCurrentUser] = useState(null)

    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

    useEffect(
        () =>
        firebase.auth().onAuthStateChanged(user => userHandler(user)),
     []
    )

  return <>{currentUser ? <SignedInStack/> : <SignedOutStack/>}</>
}

export default AuthNavigation       