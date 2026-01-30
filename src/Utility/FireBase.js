import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7UP7TT6N7ApF1WPC1ZTbkGAaGRK5brTs",
  authDomain: "clone-6d071.firebaseapp.com",
  projectId: "clone-6d071",
  storageBucket: "clone-6d071.firebasestorage.app",
  messagingSenderId: "854183181266",
  appId: "1:854183181266:web:016bc53915f0169b13e60b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();