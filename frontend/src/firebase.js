// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzDRL1JYzEojmChq5FRPZwml6Y4Tbp1-M",
  authDomain: "hyperlink-5987b.firebaseapp.com",
  projectId: "hyperlink-5987b",
  storageBucket: "hyperlink-5987b.appspot.com",
  messagingSenderId: "550095004421",
  appId: "1:550095004421:web:1e05d282fad4c913a5cd6c"
};

// Initialize Firebase
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
