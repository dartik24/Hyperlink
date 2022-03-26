import { doc, collection, getDocs, setDoc} from 'firebase/firestore'

import firebase from './firebase';

export async function addListing(listingData) {
    try {
        setDoc(doc(firebase.db, "listings", listingData.name), listingData);
    } catch(error) {
        console.error(error);
        return -1;
    }
}

export async function getListings() {
    try {
        const querySnapshot = await getDocs(collection(firebase.db, "listings"));
        const listings = [];
        const res = querySnapshot.forEach(doc => listings.push(doc.data()) );
        console.log(listings);
        return listings;        
    } catch(error) {
        console.error(error);
        return -1;
    }
}

// TODO
export async function deleteListing() { }
export async function modifyListing() { }