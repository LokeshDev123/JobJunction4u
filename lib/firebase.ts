// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsaLzqV1Vvx-MNK6PqJksdFkfshZhRe6g",
  authDomain: "jobjunction4u-d495f.firebaseapp.com",
  projectId: "jobjunction4u-d495f",
  storageBucket: "jobjunction4u-d495f.firebasestorage.app",
  messagingSenderId: "224771971274",
  appId: "1:224771971274:web:e54d5b667bf30afea5bc33",
  measurementId: "G-NPZ9CEXVVW"
};


// Initialize Firebase
const app:FirebaseApp = initializeApp(firebaseConfig);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let analytics:any = undefined
if(typeof window !=="undefined"){
  analytics = getAnalytics(app);
}
const auth=getAuth()


export {app,auth}