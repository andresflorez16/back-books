const firebase = require("firebase/app") 
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } = require("firebase/auth")

const firebaseConfig = {
  apiKey: "AIzaSyC3XUGsnndAiGr_e77KIqT_BkiqFVHwuYM",
  authDomain: "books-api-58e9f.firebaseapp.com",
  projectId: "books-api-58e9f",
  storageBucket: "books-api-58e9f.appspot.com",
  messagingSenderId: "1029941829306",
  appId: "1:1029941829306:web:3f47400208f915d914ec83",
  measurementId: "G-69DHGR8N94"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification }
