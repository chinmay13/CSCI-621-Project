// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJiPxri_NhpfhSjhO-3XSlW7oaWNaz0dY",
  authDomain: "csci-621-project-fb6a2.firebaseapp.com",
  projectId: "csci-621-project-fb6a2",
  storageBucket: "csci-621-project-fb6a2.appspot.com",
  messagingSenderId: "676915185863",
  appId: "1:676915185863:web:1512f6e1c5834dd7b016e2",
  measurementId: "G-4PDHW67XV0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
