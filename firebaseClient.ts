import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export function getFirebaseConfig() {
  const cfg = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
  };
  for (const [k, v] of Object.entries(cfg)) {
    if (!v) throw new Error(`Missing env ${k}`);
  }
  return cfg;
}

export function getClientApp(): FirebaseApp {
  if (getApps().length) return getApps()[0]!;
  return initializeApp(getFirebaseConfig());
}

export function getClientAuth() {
  return getAuth(getClientApp());
}

export function getClientDb() {
  return getFirestore(getClientApp());
}
