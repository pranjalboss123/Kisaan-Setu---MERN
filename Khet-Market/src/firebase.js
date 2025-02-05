import firebase from 'firebase';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1ajFiZWF6X8OSzzeHFZzfl-1YsgVumnk",
    authDomain: "kisansetu-5d302.firebaseapp.com",
    projectId: "kisansetu-5d302",
    storageBucket: "kisansetu-5d302.firebasestorage.app",
    messagingSenderId: "560158610179",
    appId: "1:560158610179:web:4df83f19e25190a89a4f36",
    measurementId: "G-XFMNNYQD3Y"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { db, auth, provider, firebaseApp, storage };