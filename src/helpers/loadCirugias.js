import { cirugiasCollection } from "../firebase/firebase-config"

export const loadCirugias = async ( idFicha ) => {

  let cirugias = [];
  // const querySnapshot = await cirugiasCollection.where( 'idFicha', '==', idFicha ).get();
  const querySnapshot = await cirugiasCollection.where( 'idFicha', '==', idFicha ).orderBy('createdAt', 'desc').get();
  console.log( 'querySnapshot de cirugias', querySnapshot )
  querySnapshot.forEach(doc => {
    cirugias.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return cirugias;
}