import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBCE8cbVV-gilkoDZ4Fcp4sSRixBDX-Ubc",
  authDomain: "todo-app-b6d35.firebaseapp.com",
  projectId: "todo-app-b6d35",
  storageBucket: "todo-app-b6d35.appspot.com",
  messagingSenderId: "458479476698",
  appId: "1:458479476698:web:614a448c85a95ed36e6ae3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;