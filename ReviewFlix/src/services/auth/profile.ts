import { firestore } from "../firebase";
import { updateProfile as firebaseUpdateProfile, type User as FirebaseUser } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import type { ProfileInput } from "./types";

// Update both Firebase Auth and Firestore profile data.
export async function updateUserProfile(user: FirebaseUser, data: ProfileInput) {
  await firebaseUpdateProfile(user, {
    displayName: data.displayName,
    photoURL: data.photoURL || null,
  });

  const ref = doc(firestore, "users", user.uid);
  await updateDoc(ref, {
    displayName: data.displayName,
    bio: data.bio,
    photoURL: data.photoURL,
    updatedAt: new Date().toISOString(),
  });
}
