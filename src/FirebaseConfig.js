// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";

import "firebase/auth";
import "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAdN9bkM9ybEyPvIbpVs4_rQCMaZOE8Q8",
  authDomain: "menu-basilia-5405d.firebaseapp.com",
  projectId: "menu-basilia-5405d",
  storageBucket: "menu-basilia-5405d.appspot.com",
  messagingSenderId: "887215870166",
  appId: "1:887215870166:web:bf01367816261a2ad1f977",
  measurementId: "G-R7Z459VGP0"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);