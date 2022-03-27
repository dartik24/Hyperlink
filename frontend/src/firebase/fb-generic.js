import { collection, getDocs } from 'firebase/firestore'
import firebase from './firebase'

export async function getCollection(name) {
    try {
        const querySnapshot = await getDocs(collection(firebase.db, name));
        const listings = [];
        const res = querySnapshot.forEach(doc => listings.push(doc.data()));
        return listings;        
    } catch(error) {
        console.error(error);
        return -1;
    }
}