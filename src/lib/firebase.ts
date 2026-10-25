import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore (using custom database ID if provided)
const firestoreDbId = firebaseConfigData.firestoreDatabaseId || '(default)';
export const db = getFirestore(app, firestoreDbId);

// Auth Helpers
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Persist user profile document in Firestore
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || 'Client',
      email: user.email,
      photoURL: user.photoURL,
      lastLoginAt: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    console.error('Error updating user document in Firestore:', err);
  }

  return user;
}

export async function logOut(): Promise<void> {
  await signOut(auth);
}

// Firestore Database Operations: Appointments
export interface StoredAppointment {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  consultationId: string;
  consultationName: string;
  consultationMode?: string;
  date: string;
  time: string;
  durationMinutes: number;
  priceINR?: number;
  priceUSD?: number;
  phone?: string;
  reason?: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt?: any;
}

export async function saveAppointmentToFirestore(apt: Omit<StoredAppointment, 'id'>) {
  const colRef = collection(db, 'appointments');
  const docRef = await addDoc(colRef, {
    ...apt,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserAppointments(userId: string): Promise<StoredAppointment[]> {
  try {
    const colRef = collection(db, 'appointments');
    const q = query(colRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    } as StoredAppointment));
  } catch (err) {
    console.error('Error fetching user appointments:', err);
    return [];
  }
}

// Firestore Database Operations: Saved Systems Biology Assessments
export interface StoredAssessment {
  id?: string;
  userId: string;
  createdAt?: any;
  symptoms: string;
  biomarkers: string;
  dietStyle: string;
  primaryGoal: string;
  result: any;
}

export async function saveAssessmentToFirestore(userId: string, data: {
  symptoms: string;
  biomarkers: string;
  dietStyle: string;
  primaryGoal: string;
  result: any;
}) {
  const colRef = collection(db, 'assessments');
  const docRef = await addDoc(colRef, {
    userId,
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserAssessments(userId: string): Promise<StoredAssessment[]> {
  try {
    const colRef = collection(db, 'assessments');
    const q = query(colRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    } as StoredAssessment));
  } catch (err) {
    console.error('Error fetching saved assessments:', err);
    return [];
  }
}

// Export Auth & Firestore types
export type { User };
export { onAuthStateChanged };
