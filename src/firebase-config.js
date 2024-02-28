// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDP49lomvyTsutI83equ5MBPzFCNF4LbrE",
  authDomain: "samplefbreact2.firebaseapp.com",
  projectId: "samplefbreact2",
  storageBucket: "samplefbreact2.appspot.com",
  messagingSenderId: "359035588208",
  appId: "1:359035588208:web:c0e6d1a8deb72c9426aeb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
