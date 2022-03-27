import { doc, setDoc} from 'firebase/firestore'

import firebase from './firebase';

export async function addListing(listingData) {
    try {
        setDoc(doc(firebase.db, "listings", listingData.name), listingData);
    } catch(error) {
        console.error(error);
        return -1;
    }
}


// TODO
export async function getListings() { }
export async function deleteListing() { }
export async function modifyListing() { }