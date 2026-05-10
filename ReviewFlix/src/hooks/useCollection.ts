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

  useEffect(() => {

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
      });

    return () => unsubscribe();

  }, [collectionName]);

  return { documents };
};