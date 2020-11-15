import { db } from "../firebase/firebase-config"

export const loadDesparacitaciones = async () => {

  const lista = await db.collection('desparacitacion').orderBy('createdAt', 'desc').get();
  const desparacitaciones = [];

  lista.forEach( snap => {
    desparacitaciones.push({
      id: snap.id,
      ...snap.data()
    });
  });

  return desparacitaciones;
}