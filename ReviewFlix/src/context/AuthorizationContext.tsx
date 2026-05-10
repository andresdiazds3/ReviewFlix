import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import * as authService from "../services/auth";

type AuthContextValue = {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
  signInWithEmail: (email: string, password: string) => Promise<FirebaseUser | null>;
  registerWithEmail: (email: string, password: string, displayName?: string) => Promise<FirebaseUser | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Keeps the authenticated Firebase user in React state and exposes auth actions.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = authService.onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    signInWithGoogle: async () => {
      const u = await authService.signInWithGoogle();
      setUser(u as any);
      return u as any;
    },
    signInWithEmail: async (email, password) => {
      const u = await authService.signInWithEmail(email, password);
      setUser(u as any);
      return u as any;
    },
    registerWithEmail: async (email, password, displayName) => {
      const u = await authService.registerWithEmail(email, password, displayName ?? "");
      setUser(u as any);
      return u as any;
    },
    signOut: async () => {
      await authService.signOut();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Access the shared auth state/actions from any component.
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export default AuthProvider;
