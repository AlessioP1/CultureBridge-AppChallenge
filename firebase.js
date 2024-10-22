// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'; // Updated import for Firebase
import 'firebase/compat/auth'; // Importing auth module
import 'firebase/compat/firestore'; // Importing firestore module
import 'firebase/compat/storage'; // Import Firebase Storage


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANNxOZ2znSiwqp5HPGYuGx_dPHKhVN1W0",
  authDomain: "culturebridge-congressionalapp.firebaseapp.com",
  projectId: "culturebridge-congressionalapp",
  storageBucket: "culturebridge-congressionalapp.appspot.com",
  messagingSenderId: "473820118245",
  appId: "1:473820118245:web:5a9d79f73c3820bdea280c"
};

// Initialize Firebase
if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig); // Initialize only if no app is initialized
}

const db = firebase.firestore(); // Initialize firestore
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase }; // Export firestore database
