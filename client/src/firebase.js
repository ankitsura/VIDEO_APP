import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCksLKZf9fkG9tlpik1GH_MdEdvXtkzSzs",
  authDomain: "video-23ac5.firebaseapp.com",
  projectId: "video-23ac5",
  storageBucket: "video-23ac5.appspot.com",
  messagingSenderId: "772500904977",
  appId: "1:772500904977:web:3d1ef514df46b9e5a425b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;