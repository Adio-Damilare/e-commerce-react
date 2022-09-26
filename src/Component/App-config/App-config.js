import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMuyKnBaV5muXoJLF8OBsTRvDaeVu4bA8",
  authDomain: "authentication-8cf0f.firebaseapp.com",
  projectId: "authentication-8cf0f",
  storageBucket: "authentication-8cf0f.appspot.com",
  messagingSenderId: "939620355707",
  appId: "1:939620355707:web:42b0bf72ebe26b1af35cde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
 export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()