import {
  addDoc,
  collection
} from "firebase/firestore";

import { db } from "../services/firebase";

export const useCreate = (
  collectionName: string
) => {

  const createDocument =
    async (data: any) => {

      const ref =
        collection(db, collectionName);

      return await addDoc(ref, data);
    };

  return { createDocument };
};