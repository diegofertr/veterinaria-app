import { db } from "../firebase/firebase-config"

export const loadCirugias = async () => {

  const lista = await db.collection('cirugia').orderBy('createdAt', 'desc').get();
  const cirugias = [];

  lista.forEach( snap => {
    cirugias.push({
      id: snap.id,
      ...snap.data()
    });
  });

  return cirugias;
}