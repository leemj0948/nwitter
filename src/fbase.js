// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// import 'firebase/database';
import {getAuth,signInWithEmailAndPassword,
  createUserWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,GithubAuthProvider,signInWithPopup,signOut } from "firebase/auth";
import {getFirestore,addDoc,collection} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY ,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const signIn = signInWithEmailAndPassword; //로그인 할때의 통신
export const signup = createUserWithEmailAndPassword; // 가입할때 통신 
export const isAuthChange = onAuthStateChanged //로그인이후 로그인 값이 있는지 

export const dbService = getFirestore();
export const dbAddDoc = addDoc; // 명시된 데이터를 담은 새로운 document를 collection에 추가 document ID 자동으로 추가 
export const dbCollection = collection;

export {GoogleAuthProvider,GithubAuthProvider,signInWithPopup,signOut}