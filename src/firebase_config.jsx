import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcBTrA_J9B9B6mBbJ4NR8ET7QiuuhSG3M",
  authDomain: "attender-feedback-80475.firebaseapp.com",
  projectId: "attender-feedback-80475",
  storageBucket: "attender-feedback-80475.appspot.com",
  messagingSenderId: "625416719120",
  appId: "1:625416719120:web:cf14e28962fae35a5f3395",
  measurementId: "G-8Z6PN9TKD6",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Auth
const auth = getAuth(app); // Initialize the Auth instance

// Exporting app, firestore, and auth
export { app, firestore, auth };

// Exporting db
export const db = firestore;
