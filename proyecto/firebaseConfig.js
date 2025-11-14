import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrUsuAjXG-AF17BhzLD0DRU3afpdIPozQ",
  authDomain: "game-of-thrones-characters-api.firebaseapp.com",
  projectId: "game-of-thrones-characters-api",
  storageBucket: "game-of-thrones-characters-api.firebasestorage.app",
  messagingSenderId: "492866203982",
  appId: "1:492866203982:web:b18682bf5d1d1283b02e1f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };