import {
  collection,
  onSnapshot
} from "firebase/firestore";

import {
  useEffect,
  useState
} from "react";

import { db } from "../services/firebase";

export const useCollection = (
  collectionName: string
) => {

  const [documents, setDocuments] =
    useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const ref =
      collection(db, collectionName);

    const unsubscribe =
      onSnapshot(ref, snapshot => {

        const results =
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

        setDocuments(results);
        setLoading(false);
      }, err => {
        setError(String(err));
        setLoading(false);
      });

    return () => unsubscribe();

  }, [collectionName]);

  return { documents, loading, error };
};