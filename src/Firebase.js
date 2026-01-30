import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7UP7TT6N7ApF1WPC1ZTbkGAaGRK5brTs",
  authDomain: "clone-6d071.firebaseapp.com",
  projectId: "clone-6d071",
  storageBucket: "clone-6d071.firebasestorage.app",
  messagingSenderId: "854183181266",
  appId: "1:854183181266:web:016bc53915f0169b13e60b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
