import firebase from "firebase/app";
 import "firebase/database";

 const firebaseConfig = {
   apiKey: "AIzaSyCFu1-IGCKpU-Bobn1-q3zUa6x4iltODEw",
   authDomain: "scheduler-5a0c3.firebaseapp.com",
   databaseURL: "https://scheduler-5a0c3.firebaseio.com",
   projectId: "scheduler-5a0c3"
   // storageBucket: "....",
   // messagingSenderId: "...",
   // appId: "..."
 };

 firebase.initializeApp(firebaseConfig);
 const db = firebase.database().ref();

 export default db;