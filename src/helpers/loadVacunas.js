import { vacunasCollection } from "../firebase/firebase-config"

export const loadVacunas = async ( idFicha ) => {
  let vacunas = [];
  const querySnapshotVacunas = await vacunasCollection.where( 'idFicha', '==', idFicha ).orderBy('createdAt', 'desc').get();
  // const querySnapshotVacunas = await vacunasCollection.where( 'idFicha', '==', idFicha ).get();
  querySnapshotVacunas.forEach(doc => {
    vacunas.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return vacunas;

  // const vacunasSnap = await db.collection('vacuna').orderBy('createdAt', 'desc').get();
  // const vacunas = [];

  // vacunasSnap.forEach( snap => {
  //   vacunas.push({
  //     id: snap.id,
  //     ...snap.data()
  //   });
  // });

  // return vacunas;
}