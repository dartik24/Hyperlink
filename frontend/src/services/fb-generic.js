import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
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

// Delete listing: for document name pass in listing.employeID-listing.name and collectionName as 'listings'
export async function deleteDocument(collectionName, documentName) { 
    try { 
        deleteDoc(doc(firebase.db, collectionName, documentName)).then(() => { 
            return true;
        });
    } catch(error) { 
        console.error(error.code + ": " + error.message);
        return false;
    }
}