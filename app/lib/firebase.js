import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp, arrayUnion, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, setPersistence, browserLocalPersistence } from 'firebase/auth';

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

// Enable persistence
setPersistence(auth, browserLocalPersistence);

export async function handleCustomToken(token) {
  try {
    // Sign in with the custom token
    const userCredential = await signInWithCustomToken(auth, token);
    // Get the ID token
    const idToken = await userCredential.user.getIdToken();
    return idToken;
  } catch (error) {
    console.error('Error signing in with custom token:', error);
    throw error;
  }
}

export async function saveBooking(projectId, weekData, selectedWeek, price) {
  try {
    const bookingRef = doc(db, 'price-calendar-bookings', projectId);
    const bookingDoc = await getDoc(bookingRef);
    
    const newBooking = {
      weekNumber: selectedWeek,
      startDate: weekData.startDate,
      endDate: weekData.endDate,
      price: price,
      createdAt: serverTimestamp(),
    };

    if (!bookingDoc.exists()) {
      // Create new document with bookings array
      await setDoc(bookingRef, {
        bookings: [newBooking]
      });
    } else {
      // Add new booking to existing array
      await updateDoc(bookingRef, {
        bookings: arrayUnion(newBooking)
      });
    }
    
    return newBooking;
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
}

export async function getExistingBooking(projectId) {
  try {
    const bookingRef = doc(db, 'price-calendar-bookings', projectId);
    const bookingDoc = await getDoc(bookingRef);
    
    if (bookingDoc.exists()) {
      const data = bookingDoc.data();
      const bookings = data.bookings || [];
      
      // Find the most recent valid booking
      const validBooking = bookings
        .filter(booking => {
          const createdAt = booking.createdAt?.toDate();
          if (createdAt) {
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
            return createdAt > fiveDaysAgo;
          }
          return false;
        })
        .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate())[0];

      return validBooking || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

export { app, db, auth }; 