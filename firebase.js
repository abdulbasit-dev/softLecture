import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDWkafgBI93kR7kPLudsPrG_Y07WHwy8JE',
  authDomain: 'my-lecture-a07ef.firebaseapp.com',
  databaseURL: 'https://my-lecture-a07ef.firebaseio.com',
  projectId: 'my-lecture-a07ef',
  storageBucket: 'my-lecture-a07ef.appspot.com',
  messagingSenderId: '832951445616',
  appId: '1:832951445616:web:78d1d2db10c084da716cb5',
  measurementId: 'G-PCMVDHKCL6',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
