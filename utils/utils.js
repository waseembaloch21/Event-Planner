import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}
  from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
   where,
}
  from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
   getStorage,
   ref,
   uploadBytes,
   getDownloadURL,

 }
  from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3rindrR2Y6ZxC9o4Sl0oQtwujE2Q_9jE",
  authDomain: "my-first-project-6f46d.firebaseapp.com",
  projectId: "my-first-project-6f46d",
  storageBucket: "my-first-project-6f46d.appspot.com",
  messagingSenderId: "191622749804",
  appId: "1:191622749804:web:8629ccf67fb1eb80280249",
  measurementId: "G-T4NJQCJ02L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export {
  auth,
  db,
  storage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query, where,
};