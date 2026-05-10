import {
  doc,
  onSnapshot
} from "firebase/firestore";

import {
  useEffect,
  useState
} from "react";

import { db } from "../services/firebase";

export const useDocument = (
  collectionName: string,
  id: string
) => {

  const [document, setDocument] =
    useState<any>(null);

  useEffect(() => {

    const ref =
      doc(db, collectionName, id);

    const unsubscribe =
      onSnapshot(ref, snapshot => {

        setDocument({
          id: snapshot.id,
          ...snapshot.data()
        });

      });

    return () => unsubscribe();

  }, [collectionName, id]);

  return { document };
};