import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export async function handleMagicLink() {
  try {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get email from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      
      if (!email) {
        throw new Error('No email provided in magic link');
      }

      // Sign in with email link
      const result = await signInWithEmailLink(auth, email, window.location.href);
      // Get the ID token
      const idToken = await result.user.getIdToken();
      return idToken;
    }
    return null;
  } catch (error) {
    console.error('Error handling magic link:', error);
    throw error;
  }
}

export { app, db, auth }; 