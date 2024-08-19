// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQsi7OsfMyn8M13FIOIITT4XITaBPzJLY",
  authDomain: "tradehub-ec4d8.firebaseapp.com",
  projectId: "tradehub-ec4d8",
  storageBucket: "tradehub-ec4d8.appspot.com",
  messagingSenderId: "474799864237",
  appId: "1:474799864237:web:7d42919c97b1c4472b8924",
  measurementId: "G-VH4D3HPT5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
