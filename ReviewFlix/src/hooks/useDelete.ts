import {
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../services/firebase";

export const useDelete = (
  collectionName: string
) => {

  const deleteDocument =
    async (id: string) => {

      const ref =
        doc(db, collectionName, id);

      await deleteDoc(ref);
    };

  return { deleteDocument };
};