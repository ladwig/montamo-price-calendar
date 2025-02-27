import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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
      createdAt: new Date().toISOString(),
    };

    if (!bookingDoc.exists()) {
      // Create new document with bookings array
      await setDoc(bookingRef, {
        bookings: [newBooking]
      });
    } else {
      // Get existing bookings and add new one
      const existingData = bookingDoc.data();
      const updatedBookings = [...(existingData.bookings || []), newBooking];
      
      // Update document with new bookings array
      await updateDoc(bookingRef, {
        bookings: updatedBookings
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
          const createdAt = new Date(booking.createdAt);
          const fiveDaysAgo = new Date();
          fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
          return createdAt > fiveDaysAgo;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      return validBooking || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

export { app, db, auth }; 