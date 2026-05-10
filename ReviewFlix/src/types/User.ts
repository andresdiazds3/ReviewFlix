export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  createdAt?: string;
  // app-specific fields
  top10?: string[]; // array of movieIds
  friends?: string[];
  bio?: string | null;
}
