import { desparacitacionesCollection } from "../firebase/firebase-config"

export const loadDesparacitaciones = async ( idFicha ) => {

  let desparacitaciones = [];
  // const querySnapshot = await desparacitacionesCollection.where( 'idFicha', '==', idFicha ).get();
  const querySnapshot = await desparacitacionesCollection.where( 'idFicha', '==', idFicha ).orderBy('createdAt', 'desc').get();
  querySnapshot.forEach(doc => {
    desparacitaciones.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return desparacitaciones;
}