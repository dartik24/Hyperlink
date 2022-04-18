import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, deleteUser} from "firebase/auth";
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
        return {error: false};
    } catch(error) {
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
        setDoc(doc(firebase.db, 'users', user.uid), userData, {merge: true});
        return true;
    } catch(error) {
        console.error(error.code + ": " + error.message);
        return false;
    }
}

export async function uploadFileToStorage(user, file, fileName) { 
    const storage = getStorage()
    const imageFolderRef = ref(storage, user.uid + '/' + fileName)
    try { 
        uploadBytes(imageFolderRef, file)
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

// delete currently authenticated user
// then call the deleteDoucment function below to delete that user's document in Firestore
export async function delUser() { 
    const auth = getAuth();
    const user = auth.currentUser;

    if(user === null) { 
        // Get encrypted password and decrypt it
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const CryptoJS = require("crypto-js");
        const encryptedPass = localStorage.getItem('UserPassword')
        const bytes  = CryptoJS.AES.decrypt(encryptedPass, 'J:pq/!,?vE"v!UKf');
        const password = bytes.toString(CryptoJS.enc.Utf8);
       
        const userData = {
            username: storedUser['email'],
            password: password
        }

        // Attemp to login to auth before delete
        login(userData).then(user => {
          if(user.error) {
              user = null
              console.error(user.error.code + ": " + user.error.message)
              return false
          } else { // on success of auth, delete user
              user = auth.currentUser;
              deleteUser(user).then(() => {
                  return true
              }).catch((error) => {
                  console.error(error.code + ": " + error.message)
                  return false
              });
          }
        });
    } else {  
        deleteUser(user).then(() => {
            return true
        }).catch((error) => {
            console.error(error.code + ": " + error.message)
            return false
        });
    }
}