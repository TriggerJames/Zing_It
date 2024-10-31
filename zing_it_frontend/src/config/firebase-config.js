import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBybiTKTcqlJqY1zhf_L8GS4NCgQqN3pxE",
  authDomain: "zing-it-3eae4.firebaseapp.com",
  projectId: "zing-it-3eae4",
  storageBucket: "zing-it-3eae4.appspot.com",
  messagingSenderId: "1035739735533",
  appId: "1:1035739735533:web:b8d2c69f5d6d4b380c0307"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;