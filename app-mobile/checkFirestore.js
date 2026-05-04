const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAFQKbBSAhnpMv2A5A8THGqhHZFmNXP6Z0",
  authDomain: "producto-2-fp067.firebaseapp.com",
  projectId: "producto-2-fp067",
  storageBucket: "producto-2-fp067.firebasestorage.app",
  messagingSenderId: "583706100820",
  appId: "1:583706100820:web:b85c40b7261776fcf559c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  const querySnapshot = await getDocs(collection(db, 'players'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data().imagen, doc.data().video);
  });
}

test();
