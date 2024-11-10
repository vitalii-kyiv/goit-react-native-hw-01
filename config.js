import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmt4e5raoQwrjoXpZrfzkCEz0pORWwv58",
  authDomain: "goit-react-native-e523f.firebaseapp.com",
  // databaseURL: "<https://project-id.firebaseio.com>",
  projectId: "goit-react-native-e523f",
  storageBucket: "goit-react-native-e523f.firebasestorage.app",
  messagingSenderId: "283725774834",
  appId: "1:283725774834:web:1cc7583098f1d7c5eb756b",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

// Ініціалізація Auth з використанням AsyncStorage для збереження сесії
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Ініціалізація Firestore та Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
