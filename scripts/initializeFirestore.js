import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Week data for 2025
const weekData = {
  "1": { percentage: 5, startDate: "2025-01-01", endDate: "2025-01-05", availability: 3, isDisabled: true },
  "2": { percentage: 5, startDate: "2025-01-06", endDate: "2025-01-12", availability: 3, isDisabled: true },
  "3": { percentage: 5, startDate: "2025-01-13", endDate: "2025-01-19", availability: 5 },
  "4": { percentage: 5, startDate: "2025-01-20", endDate: "2025-01-26", availability: 5 },
  "5": { percentage: 0, startDate: "2025-01-27", endDate: "2025-02-02", availability: 4 },
  "6": { percentage: 0, startDate: "2025-02-03", endDate: "2025-02-09", availability: 4 },
  "7": { percentage: 0, startDate: "2025-02-10", endDate: "2025-02-16", availability: 4 },
  "8": { percentage: 0, startDate: "2025-02-17", endDate: "2025-02-23", availability: 4 },
  "9": { percentage: -5, startDate: "2025-02-24", endDate: "2025-03-02", availability: 5 },
  "10": { percentage: -5, startDate: "2025-03-03", endDate: "2025-03-09", availability: 5 },
  "11": { percentage: -5, startDate: "2025-03-10", endDate: "2025-03-16", availability: 5 },
  "12": { percentage: -5, startDate: "2025-03-17", endDate: "2025-03-23", availability: 5 },
  "13": { percentage: -10, startDate: "2025-03-24", endDate: "2025-03-30", availability: 5 },
  "14": { percentage: -10, startDate: "2025-03-31", endDate: "2025-04-06", availability: 5 },
  "15": { percentage: -10, startDate: "2025-04-07", endDate: "2025-04-13", availability: 5 },
  "16": { percentage: -10, startDate: "2025-04-14", endDate: "2025-04-20", availability: 5 },
  "17": { percentage: 0, startDate: "2025-04-21", endDate: "2025-04-27", availability: 4 },
  "18": { percentage: 0, startDate: "2025-04-28", endDate: "2025-05-04", availability: 4 },
  "19": { percentage: 0, startDate: "2025-05-05", endDate: "2025-05-11", availability: 4 },
  "20": { percentage: 0, startDate: "2025-05-12", endDate: "2025-05-18", availability: 4 },
  "21": { percentage: 10, startDate: "2025-05-19", endDate: "2025-05-25", availability: 3 },
  "22": { percentage: 10, startDate: "2025-05-26", endDate: "2025-06-01", availability: 3 },
  "23": { percentage: 10, startDate: "2025-06-02", endDate: "2025-06-08", availability: 3 },
  "24": { percentage: 10, startDate: "2025-06-09", endDate: "2025-06-15", availability: 3 },
  "25": { percentage: 15, startDate: "2025-06-16", endDate: "2025-06-22", availability: 2 },
  "26": { percentage: 15, startDate: "2025-06-23", endDate: "2025-06-29", availability: 2 },
  "27": { percentage: 15, startDate: "2025-06-30", endDate: "2025-07-06", availability: 2 },
  "28": { percentage: 15, startDate: "2025-07-07", endDate: "2025-07-13", availability: 2 },
  "29": { percentage: 10, startDate: "2025-07-14", endDate: "2025-07-20", availability: 3 },
  "30": { percentage: 10, startDate: "2025-07-21", endDate: "2025-07-27", availability: 3 },
  "31": { percentage: 10, startDate: "2025-07-28", endDate: "2025-08-03", availability: 3 },
  "32": { percentage: 10, startDate: "2025-08-04", endDate: "2025-08-10", availability: 3 },
  "33": { percentage: 5, startDate: "2025-08-11", endDate: "2025-08-17", availability: 4 },
  "34": { percentage: 5, startDate: "2025-08-18", endDate: "2025-08-24", availability: 4 },
  "35": { percentage: 5, startDate: "2025-08-25", endDate: "2025-08-31", availability: 4 },
  "36": { percentage: 5, startDate: "2025-09-01", endDate: "2025-09-07", availability: 4 },
  "37": { percentage: 0, startDate: "2025-09-08", endDate: "2025-09-14", availability: 4 },
  "38": { percentage: 0, startDate: "2025-09-15", endDate: "2025-09-21", availability: 4 },
  "39": { percentage: 0, startDate: "2025-09-22", endDate: "2025-09-28", availability: 4 },
  "40": { percentage: 0, startDate: "2025-09-29", endDate: "2025-10-05", availability: 4 },
  "41": { percentage: -5, startDate: "2025-10-06", endDate: "2025-10-12", availability: 5 },
  "42": { percentage: -5, startDate: "2025-10-13", endDate: "2025-10-19", availability: 5 },
  "43": { percentage: -5, startDate: "2025-10-20", endDate: "2025-10-26", availability: 5 },
  "44": { percentage: -5, startDate: "2025-10-27", endDate: "2025-11-02", availability: 5 },
  "45": { percentage: -10, startDate: "2025-11-03", endDate: "2025-11-09", availability: 5 },
  "46": { percentage: -10, startDate: "2025-11-10", endDate: "2025-11-16", availability: 5 },
  "47": { percentage: -10, startDate: "2025-11-17", endDate: "2025-11-23", availability: 5 },
  "48": { percentage: -10, startDate: "2025-11-24", endDate: "2025-11-30", availability: 5 },
  "49": { percentage: -15, startDate: "2025-12-01", endDate: "2025-12-07", availability: 5 },
  "50": { percentage: -15, startDate: "2025-12-08", endDate: "2025-12-14", availability: 5 },
  "51": { percentage: -15, startDate: "2025-12-15", endDate: "2025-12-21", availability: 2, isDisabled: true },
  "52": { percentage: -15, startDate: "2025-12-22", endDate: "2025-12-31", availability: 2, isDisabled: true }
};

async function initializeFirestore() {
  try {
    const year = 2025;
    const weeksCollectionRef = collection(db, 'price-calendar-weeks');
    const yearDocRef = doc(weeksCollectionRef, year.toString());
    
    // Create a document for the year with all weeks
    await setDoc(yearDocRef, { weekData });
    
    console.log('Firestore initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeFirestore(); 