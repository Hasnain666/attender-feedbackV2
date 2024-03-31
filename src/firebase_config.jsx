import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebase_Config = {
  apiKey: "AIzaSyAcBTrA_J9B9B6mBbJ4NR8ET7QiuuhSG3M",
  authDomain: "attender-feedback-80475.firebaseapp.com",
  projectId: "attender-feedback-80475",
  storageBucket: "attender-feedback-80475.appspot.com",
  messagingSenderId: "625416719120",
  appId: "1:625416719120:web:cf14e28962fae35a5f3395",
  measurementId: "G-8Z6PN9TKD6",
};

// Initialize Firebase
const app = initializeApp(firebase_Config);

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

export const auth = getAuth(app); // Export auth

export default app;