import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6Yw9bpwMOWQ5sIuFc8liCPIggMsVV5M4",
  authDomain: "socialmedia-b2d37.firebaseapp.com",
  projectId: "socialmedia-b2d37",
  storageBucket: "socialmedia-b2d37.appspot.com",
  messagingSenderId: "379431505456",
  appId: "1:379431505456:web:bc542b2ee1312ab927e7f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
