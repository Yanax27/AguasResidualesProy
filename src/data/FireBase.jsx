// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';//conexion 
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTt7u-lrPy-yAL1IuLre9214HrOy1HgSs",
  authDomain: "lineadeselecionptar.firebaseapp.com",
  projectId: "lineadeselecionptar",
  storageBucket: "lineadeselecionptar.appspot.com",
  messagingSenderId: "883530077914",
  appId: "1:883530077914:web:1ad4d493bb9fd0e84af7e3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
export {auth,app};
//insertar
const appinsert = initializeApp(firebaseConfig);
const db=getFirestore(appinsert);
export {db};