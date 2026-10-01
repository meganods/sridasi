import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMalcDQ_tw7ssh8cIsndxbORlcy8lAjMI",
  authDomain: "sridasi.firebaseapp.com",
  projectId: "sridasi",
  storageBucket: "sridasi.firebasestorage.app",
  messagingSenderId: "1047318105393",
  appId: "1:1047318105393:web:25e691eecb30efa47db410",
  measurementId: "G-G97XCDYQ4J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
