import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, deleteUser} from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc} from 'firebase/firestore'
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
        console.error(error.code + ": " + error.message);
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

    deleteUser(user).then(() => {
        return true
    }).catch((error) => {
        console.error(error.code + ": " + error.message)
        return false
    });
}

// Delete listing: for document name pass in listing.employeID-listing.name and collectionName as 'listings'
// Delete user: for document name pass in user.uid and collection name as 'users'
export async function deleteDocument(collectionName, documentName) { 
    try { 
        deleteDoc(firebase.db, collectionName, documentName).then(() => { 
            return true
        })
    } catch(error) { 
        console.error(error.code + ": " + error.message)
        return false
    }
}