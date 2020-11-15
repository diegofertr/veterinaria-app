import { db } from "../firebase/firebase-config"

export const loadVitaminas = async () => {

  const vitaminasSnap = await db.collection('vitamina').orderBy('createdAt', 'desc').get();
  const vitaminas = [];

  vitaminasSnap.forEach( snap => {
    vitaminas.push({
      id: snap.id,
      ...snap.data()
    });
  });

  return vitaminas;
}