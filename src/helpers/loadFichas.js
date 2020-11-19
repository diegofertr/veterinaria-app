import { fichasCollection } from "../firebase/firebase-config"
import { loadAllMascotas } from "./loadMascotas";

export const loadFichas = async ( uid ) => {
  // console.log('cargando fichas médicas del veterinario')
  // const mascotasSnap = await mascotasCollection.where( 'usuarioId', '==', uid ).orderBy('createdAt', 'desc').get();
  const querySnapshot = await fichasCollection.where( 'idVeterinario', '==', uid ).get();
  let fichas = [];
  const mascotas = await loadAllMascotas();

  querySnapshot.forEach( snap => {
    // console.log( 'fichaId ', snap.id)
    fichas.push({
      id: snap.id,
      ...snap.data(),
      mascota: {
        nombre: 'Memuchis'
      }
    });
  });
  // console.log( '[1] fichas obtenidas ::: ', fichas )

  fichas.map( async ficha => {
    const mascota = mascotas.find( x => x.id === ficha.idMascota )
    ficha.mascota = mascota
    return ficha;
  })

  return fichas;
}