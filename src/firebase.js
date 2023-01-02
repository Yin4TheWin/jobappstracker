// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHK-P4TbC9_eerR-ir7OvILv9RZh2hCpQ",
  authDomain: "jobappstracker-ae42a.firebaseapp.com",
  projectId: "jobappstracker-ae42a",
  storageBucket: "jobappstracker-ae42a.appspot.com",
  messagingSenderId: "806834448455",
  appId: "1:806834448455:web:32da207ecae284201b6962",
  measurementId: "G-DL76FBZQNR"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export {firebase}