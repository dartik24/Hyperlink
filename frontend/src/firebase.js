import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCttgfYfTcFvh9F83ByvcnHgdXIKxEE5jw",
    authDomain: "hyperlink-18f74.firebaseapp.com",
    projectId: "hyperlink-18f74",
    storageBucket: "hyperlink-18f74.appspot.com",
    messagingSenderId: "821909883789",
    appId: "1:821909883789:web:823057ae78860cb14e0bc4"
};

const app = initializeApp(firebaseConfig);

const logInWithEmailAndPassword = async (email, password) => {
    console.log('try sigin ')
    try {
      await signInWithEmailAndPassword(getAuth(app), email, password);
      console.log('logged in')
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};
export default logInWithEmailAndPassword;


// import {
  // ​​  GoogleAuthProvider,
  // ​​  getAuth,
  // signInWithPopup,
  // ​​  signInWithEmailAndPassword,
  // ​​  createUserWithEmailAndPassword,
  // ​​  sendPasswordResetEmail,
  // ​​  signOut,
  // ​​} from "firebase/auth";