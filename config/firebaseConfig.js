import firebase from "firebase";
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDjPaUmUDdYLoiWKx4VB5xfthR7TtnnZcY",
  authDomain: "barter-app-e4265.firebaseapp.com",
  databaseURL: "https://barter-app-e4265-default-rtdb.firebaseio.com",
  projectId: "barter-app-e4265",
  storageBucket: "barter-app-e4265.appspot.com",
  messagingSenderId: "3926830909",
  appId: "1:3926830909:web:83736847177211336c9f54",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
