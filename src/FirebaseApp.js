import firebase from 'firebase';
require('firebase/firestore');

const config = {
    apiKey: "AIzaSyAQuHWwK0AtshkERf56fBHfQ3tYa5BglLQ",
    authDomain: "myproject2-a7edd.firebaseapp.com",
    databaseURL: "https://myproject2-a7edd.firebaseio.com",
    projectId: "myproject2-a7edd",
    storageBucket: "myproject2-a7edd.appspot.com",
    messagingSenderId: "204095940696"
};

const settings = {timestampsInSnapshots: true};

export const FirebaseApp = firebase.initializeApp(config);

export const FirestoreDB = FirebaseApp.firestore(); 
FirestoreDB.settings(settings);

export const FirestoreTimestamp = firebase.firestore.FieldValue.serverTimestamp();
