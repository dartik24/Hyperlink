import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc} from 'firebase/firestore'
import { getStorage, ref, uploadBytes} from 'firebase/storage'

import firebase from './firebase';

export async function signup(signupData, userData) {
    try {
        const userCredential = await createUserWithEmailAndPassword(getAuth(firebase.app), signupData.username, signupData.password);
        const user = userCredential.user;
        userData = {
            ...userData,
            uid: user.uid
        }
        setDoc(doc(firebase.db, "users", user.uid), userData);
    } catch(error) {
        console.error(error.code + ": " + error.message)
        return {error};
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
        return {error};
    }
}

export async function modifyUser(user, userData) { 
    try {
        setDoc(doc(firebase.db, 'users', user.uid), userData, {merge: true})
        return true
    } catch(error) {
        console.error(error.code + ": " + error.message)
        return false
    }
}

export async function uploadImage(user, image) { 
    const storage = getStorage()
    const imageFolderRef = ref(storage, user.uid + '/profile_pic')
    try { 
        uploadBytes(imageFolderRef, image)
        return true
    } catch(error) { 
        console.error(error.code + ": " + error.message)
        return false
    }
}

export async function getFromUID(uid) {
    try {
        const docRef = doc(firebase.db, 'users', uid);
        const snap = await getDoc(docRef);
        if(snap.exists) {
            return snap.data();
        }
    } catch(error) {
        console.error(error);
    } 
}