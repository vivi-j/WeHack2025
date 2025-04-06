// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUZL6bEsKV-Np_RzfB4t6n3Oe7I_WK1k0",
  authDomain: "wehack-2025.firebaseapp.com",
  projectId: "wehack-2025",
  storageBucket: "wehack-2025.firebasestorage.app",
  messagingSenderId: "588049338007",
  appId: "1:588049338007:web:f7eba79dc82879f869a3d2",
  measurementId: "G-QK8XM54HTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};