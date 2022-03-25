import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc} from 'firebase/firestore'

import firebase from './firebase';

export async function signup(signupData, userData) {
    console.log('hello from fb functions');
    try {
        const userCredential = await createUserWithEmailAndPassword(getAuth(firebase.app), signupData.username, signupData.password);
        const user = userCredential.user;
        setDoc(doc(firebase.db, "users", user.uid), userData);
    } catch(error) {
        console.error(error.code + ": " + error.message)
        return null;
    }
}

export async function login(userData) {
    try {
        const userCredential = await signInWithEmailAndPassword(getAuth(firebase.app), userData.username, userData.password);
        const user = userCredential.user;
        const docRef = doc(firebase.db, 'users', user.uid);
        return (await getDoc(docRef)).data();
    } catch(error) {
        console.error(error.code + ": " + error.message)
        return null;
    }
}