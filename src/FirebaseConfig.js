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

  apiKey: "AIzaSyAvmNOEx2eKGw_Xm-3dkPYopWQ8n1-JL3g",

  authDomain: "sena-proyecto.firebaseapp.com",

  projectId: "sena-proyecto",

  storageBucket: "sena-proyecto.appspot.com",

  messagingSenderId: "257501147079",

  appId: "1:257501147079:web:38117e500e83a99ef5b3e2"

};



export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);