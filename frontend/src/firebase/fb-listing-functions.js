import { doc, setDoc} from 'firebase/firestore'

import firebase from './firebase';

export async function addListing(user, listingData) {
    try {
        setDoc(doc(firebase.db, "listings", listingData.employerID + '-' + listingData.name), listingData);
        return true
    } catch(error) {
        console.error(error);
        return -1;
    }
}


// TODO
export async function getListings() { }
export async function deleteListing() { }
export async function modifyListing(listing) { 
    try {
        setDoc(doc(firebase.db, 'listings', listing.employerID + '-' + listing.name), listing, {merge: true})
        return true
    } catch(error) {
        console.log('error ')
        console.error(error.code + ": " + error.message)
        return false
    }
}