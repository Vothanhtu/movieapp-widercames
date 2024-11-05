
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBKjCYCtjGlnaBtJUWt2PuvfH8IH6H_miA",
  authDomain: "widercames.firebaseapp.com",
  projectId: "widercames",
  storageBucket: "widercames.firebasestorage.app",
  messagingSenderId: "146039249368",
  appId: "1:146039249368:web:d2dce2a6323f70e34bfaad",
  measurementId: "G-XBB7GQVRN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); 
export { auth };