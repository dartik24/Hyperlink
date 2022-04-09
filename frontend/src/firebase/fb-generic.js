import { collection, getDocs } from 'firebase/firestore';
import firebase from './firebase';

export async function getCollection(name, filter = () => true) {
    try {
        const querySnapshot = await getDocs(collection(firebase.db, name));
        const listings = [];
        querySnapshot.forEach((doc) => { 
            const lst = doc.data();
            if(filter(lst)) { 
                listings.push(lst);
            }
        });
        return listings;        
    } catch(error) {
        console.error(error);
        return -1;
    }
}