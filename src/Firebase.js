// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRfTMEmMU55jEDIy4_l0esuQSHX25GCQk",
  authDomain: "insta-reels-clone-3fb26.firebaseapp.com",
  projectId: "insta-reels-clone-3fb26",
  storageBucket: "insta-reels-clone-3fb26.appspot.com",
  messagingSenderId: "480819420381",
  appId: "1:480819420381:web:aa24287b39e94f5dcc8f34"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp  // post  ko sort karne ke liye ki latest wali sabse pahle aye 
}

export const storage  = firebase.storage();