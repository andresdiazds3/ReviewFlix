import { auth, googleProvider, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import type { User } from "../../types/User";

// Create the Firestore user document the first time a user is seen.
async function ensureUserDoc(user: FirebaseUser) {
  const ref = doc(firestore, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const data: Partial<User> = {
      uid: user.uid,
      displayName: user.displayName || null,
      email: user.email || null,
      photoURL: user.photoURL || null,
      createdAt: new Date().toISOString(),
      bio: "",
      friends: [],
      top10: [],
    };
    await setDoc(ref, data as any);
  }
}

// Google popup sign-in and initial Firestore profile bootstrap.
export async function signInWithGoogle() {
  const res = await signInWithPopup(auth, googleProvider);
  await ensureUserDoc(res.user);
  return res.user;
}

// Email/password login and Firestore bootstrap.
export async function signInWithEmail(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(res.user);
  return res.user;
}

// Email/password register and Firebase Auth display name sync.
export async function registerWithEmail(email: string, password: string, displayName: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await firebaseUpdateProfile(res.user, { displayName });
  await ensureUserDoc(res.user);
  return res.user;
}

// Sign out the current Firebase user.
export async function signOut() {
  await firebaseSignOut(auth);
}

// Subscribe to Firebase Auth state changes.
export function onAuthChange(cb: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, cb);
}
