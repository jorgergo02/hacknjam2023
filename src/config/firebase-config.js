import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvrlpBJZvqejIV5b6hwWPolNZJ_x9XIpk',
  authDomain: 'expense-tracker-1ca7c.firebaseapp.com',
  projectId: 'expense-tracker-1ca7c',
  storageBucket: 'expense-tracker-1ca7c.appspot.com',
  messagingSenderId: '999017368523',
  appId: '1:999017368523:web:6361ac78425b367b11c44e',
  measurementId: 'G-D5KKSBWR1T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
