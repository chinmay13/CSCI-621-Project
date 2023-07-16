// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getPerformance } from "firebase/performance";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKM10FbkVn9tZxB2Oh_PJW17Toc-v99XQ",
  authDomain: "todo-app-73c32.firebaseapp.com",
  projectId: "todo-app-73c32",
  storageBucket: "todo-app-73c32.appspot.com",
  messagingSenderId: "1059441317369",
  appId: "1:1059441317369:web:69798210e7b96ce3499928",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const perf = getPerformance(app);
