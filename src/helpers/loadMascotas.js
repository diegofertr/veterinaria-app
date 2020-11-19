import { mascotasCollection } from "../firebase/firebase-config"

export const loadMascotas = async ( uid ) => {
  console.log('cargando mascotas')

  // const mascotasSnap = await mascotasCollection.where( 'usuarioId', '==', uid ).orderBy('createdAt', 'desc').get();
  const mascotasSnap = await mascotasCollection.where( 'usuarioId', '==', uid ).get();
  const mascotas = [];

  mascotasSnap.forEach( snap => {
    mascotas.push({
      id: snap.id,
      ...snap.data()
    });
  });
  console.log( 'mascotas obtenidas ::: ', mascotas )

  return mascotas;
}