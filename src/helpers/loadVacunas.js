import { db } from "../firebase/firebase-config"

export const loadVacunas = async () => {

  const vacunasSnap = await db.collection('vacuna').get();
  const vacunas = [];

  vacunasSnap.forEach( snap => {
    vacunas.push({
      id: snap.id,
      ...snap.data()
    });
  });

  return vacunas;
}