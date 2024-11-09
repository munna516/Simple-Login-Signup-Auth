// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm0wi9Rw9AYnA2CxjHabPQSHJJz17bm7c",
  authDomain: "simple-login-signup-f96ec.firebaseapp.com",
  projectId: "simple-login-signup-f96ec",
  storageBucket: "simple-login-signup-f96ec.firebasestorage.app",
  messagingSenderId: "694507926197",
  appId: "1:694507926197:web:75d820ca45c72e4fc404fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);