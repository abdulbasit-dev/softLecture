import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyC5lc20Iya8hRKze1OhRsKSOSRWnV156f4',
  authDomain: 'softlecture-1858b.firebaseapp.com',
  projectId: 'softlecture-1858b',
  storageBucket: 'softlecture-1858b.appspot.com',
  messagingSenderId: '425114176815',
  appId: '1:425114176815:web:36626802eb68a70e2ce5da',
  measurementId: 'G-H2GRCGJSRX',
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
