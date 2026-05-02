import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAFQKbBSAhnpMv2A5A8THGqhHZFmNXP6Z0",
  authDomain: "producto-2-fp067.firebaseapp.com",
  databaseURL: "https://producto-2-fp067-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "producto-2-fp067",
  storageBucket: "producto-2-fp067.firebasestorage.app",
  messagingSenderId: "583706100820",
  appId: "1:583706100820:web:b85c40b7261776fcf559c1"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);
export default app;
