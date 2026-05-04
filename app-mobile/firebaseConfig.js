import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFQKbBSAhnpMv2A5A8THGqhHZFmNXP6Z0",
  authDomain: "producto-2-fp067.firebaseapp.com",
  projectId: "producto-2-fp067",
  storageBucket: "producto-2-fp067.firebasestorage.app",
  messagingSenderId: "583706100820",
  appId: "1:583706100820:web:b85c40b7261776fcf559c1"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export default app;
