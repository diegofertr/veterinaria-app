import { vitaminasCollection } from "../firebase/firebase-config"

export const loadVitaminas = async ( idFicha ) => {

  let vitaminas = [];
  // const querySnapshotVitaminas = await vitaminasCollection.where( 'idFicha', '==', idFicha ).get();
  const querySnapshotVitaminas = await vitaminasCollection.where( 'idFicha', '==', idFicha ).orderBy('createdAt', 'desc').get();
  querySnapshotVitaminas.forEach(doc => {
    vitaminas.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return vitaminas;
}