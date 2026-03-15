// firebase.js — initialize Firebase and export shared instances
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVyevJWAx5cfS10T9ORYexPdhRRxu8o7o",
  authDomain: "finance-tools-4c6ea.firebaseapp.com",
  projectId: "finance-tools-4c6ea",
  storageBucket: "finance-tools-4c6ea.firebasestorage.app",
  messagingSenderId: "315060945637",
  appId: "1:315060945637:web:2da6bf297395e83ae88a0c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
