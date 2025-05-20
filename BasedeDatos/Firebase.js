// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTimJJuKOMkrBTimvA-xgrYKeb44GiwyA",
  authDomain: "appgestiondeclientes-9ef05.firebaseapp.com",
  projectId: "appgestiondeclientes-9ef05",
  storageBucket: "appgestiondeclientes-9ef05.firebasestorage.app",
  messagingSenderId: "648252307396",
  appId: "1:648252307396:web:a14366d5857297a1dd1691"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;