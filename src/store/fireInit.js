import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'; 


export const db = firebase.initializeApp({
  apiKey: "AIzaSyCvdfiYfXqVUwDl7ZAO4EBQFTvr_08C3lw",
  authDomain: "shop-11ca7.firebaseapp.com",
  projectId: "shop-11ca7",
  storageBucket: "shop-11ca7.appspot.com",
  messagingSenderId: "432254741274",
  appId: "1:432254741274:web:29c2a04720c31effe31aa3",
  measurementId: "G-4H8DJ8KNDT",
});

export var provider = new firebase.auth.GoogleAuthProvider();
export default firebase;

