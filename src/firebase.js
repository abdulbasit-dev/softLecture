import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDsN42sfvXTz4C2WwN0cTZzPq0iJAug34Q',
  authDomain: 'softlecure.firebaseapp.com',
  projectId: 'softlecure',
  storageBucket: 'softlecure.appspot.com',
  messagingSenderId: '482012232864',
  appId: '1:482012232864:web:d2d4c30d4333ec8f785dc5',
  measurementId: 'G-JCPFL2WP08',
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
