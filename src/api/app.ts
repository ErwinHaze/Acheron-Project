import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBlzwsq6gEu4fZmCExGdZwIHK8Ptb0xlN8",
    authDomain: "acherono.firebaseapp.com",
    projectId: "acherono",
    storageBucket: "acherono.firebasestorage.app",
    messagingSenderId: "590154935819",
    appId: "1:590154935819:web:cbcb26e9606dbc0bf5e10e",
    measurementId: "G-ZJ83C7WBKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);