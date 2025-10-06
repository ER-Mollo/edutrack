// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAxjt0X61NtgrvvfeX8y9106i5hbw2VCY",
  authDomain: "edutrack-f1933.firebaseapp.com",
  projectId: "edutrack-f1933",
  storageBucket: "edutrack-f1933.firebasestorage.app",
  messagingSenderId: "564905345261",
  appId: "1:564905345261:web:39f5f6897056f358f08ce4",
  measurementId: "G-0DS0DSSN66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);