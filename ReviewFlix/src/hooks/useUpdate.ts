import {
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../services/firebase";

export const useUpdate = (
  collectionName: string
) => {

  const updateDocument =
    async (
      id: string,
      data: any
    ) => {

      const ref =
        doc(db, collectionName, id);

      await updateDoc(ref, data);
    };

  return { updateDocument };
};