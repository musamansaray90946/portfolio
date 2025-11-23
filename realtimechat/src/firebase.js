// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_4xSTJ9AqtxvwqXdLBEUQBmKEVJ3sN7w",
  authDomain: "realtimechat-54e03.firebaseapp.com",
  projectId: "realtimechat-54e03",
  storageBucket: "realtimechat-54e03.firebasestorage.app",
  messagingSenderId: "663510842506",
  appId: "1:663510842506:web:cba1c2c52002ac37d50173",
  measurementId: "G-MKRJBJ74RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);