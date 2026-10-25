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
export async function signInWithGoogle(): Promise<User | null> {
  try {
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
      console.warn('Note: Could not update user document in Firestore:', err);
    }

    return user;
  } catch (err: any) {
    if (err?.code === 'auth/popup-blocked' || err?.message?.includes('popup-blocked')) {
      console.warn('Firebase popup was blocked by browser/iframe environment. Prompting email access fallback.');
    } else if (err?.code === 'auth/popup-closed-by-user') {
      console.info('Google sign-in popup was closed by user.');
    } else {
      console.warn('Firebase sign-in notice:', err?.message || err);
    }
    throw err;
  }
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
  status: 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';
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

export async function getUserAppointments(userId: string, userEmail?: string): Promise<StoredAppointment[]> {
  try {
    const colRef = collection(db, 'appointments');
    const appointmentsMap = new Map<string, StoredAppointment>();

    // 1. Query by userId
    if (userId) {
      const qUser = query(colRef, where('userId', '==', userId));
      const snapUser = await getDocs(qUser);
      snapUser.docs.forEach((d) => {
        appointmentsMap.set(d.id, { id: d.id, ...d.data() } as StoredAppointment);
      });
    }

    // 2. Query by userEmail if provided
    if (userEmail) {
      const qEmail = query(colRef, where('userEmail', '==', userEmail.toLowerCase().trim()));
      const snapEmail = await getDocs(qEmail);
      snapEmail.docs.forEach((d) => {
        appointmentsMap.set(d.id, { id: d.id, ...d.data() } as StoredAppointment);
      });
    }

    return Array.from(appointmentsMap.values());
  } catch (err) {
    console.error('Error fetching user appointments:', err);
    return [];
  }
}

// Firestore Database Operations: Care Plans & Meal Plans
export interface StoredCarePlan {
  id?: string;
  userId: string;
  userEmail: string;
  patientName: string;
  title: string;
  practitioner: string;
  dateAssigned: string;
  clinicalFocus: string;
  dailyCalorieTarget?: string;
  macroTargets?: {
    protein: string;
    fiber: string;
    healthyFats: string;
    complexCarbs: string;
  };
  mealPlan: {
    meal: string;
    timing: string;
    dishes: string[];
    clinicalRationale: string;
  }[];
  foodsToPrioritize: string[];
  foodsToAvoid: string[];
  supplements: {
    name: string;
    dosage: string;
    timing: string;
    purpose: string;
  }[];
  lifestyleProtocols: string[];
  practitionerNotes: string;
  nextFollowUp?: string;
  createdAt?: any;
}

export async function saveCarePlanToFirestore(plan: Omit<StoredCarePlan, 'id'>) {
  const colRef = collection(db, 'carePlans');
  const docRef = await addDoc(colRef, {
    ...plan,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserCarePlans(userId: string, userEmail?: string): Promise<StoredCarePlan[]> {
  try {
    const colRef = collection(db, 'carePlans');
    const plansMap = new Map<string, StoredCarePlan>();

    if (userId) {
      const qUser = query(colRef, where('userId', '==', userId));
      const snapUser = await getDocs(qUser);
      snapUser.docs.forEach((d) => {
        plansMap.set(d.id, { id: d.id, ...d.data() } as StoredCarePlan);
      });
    }

    if (userEmail) {
      const qEmail = query(colRef, where('userEmail', '==', userEmail.toLowerCase().trim()));
      const snapEmail = await getDocs(qEmail);
      snapEmail.docs.forEach((d) => {
        plansMap.set(d.id, { id: d.id, ...d.data() } as StoredCarePlan);
      });
    }

    return Array.from(plansMap.values());
  } catch (err) {
    console.error('Error fetching user care plans:', err);
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
