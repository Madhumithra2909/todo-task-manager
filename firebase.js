import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ✅ Your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAWWNfpFPEuSBcXFaCugwqxA-Gk5yflkOY",
  authDomain: "todo-auth-app-c3fd6.firebaseapp.com",
  projectId: "todo-auth-app-c3fd6",
  storageBucket: "todo-auth-app-c3fd6.appspot.com",
  messagingSenderId: "910424349130",
  appId: "1:910424349130:web:61a3a1cd67ef417c97d733",
  measurementId: "G-VT4J2ZXCM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication utilities
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
