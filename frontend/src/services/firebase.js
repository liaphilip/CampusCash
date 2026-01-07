import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7m59tMFui98Sh14kKDi6JRnvswL_VIhE",
  authDomain: "budget-tracker-518bc.firebaseapp.com",
  projectId: "budget-tracker-518bc",
  storageBucket: "budget-tracker-518bc.firebasestorage.app",
  messagingSenderId: "871794283740",
  appId: "1:871794283740:web:e398fb8eebabcf0f801019",
  measurementId: "G-TE03ZJBGWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
