import { mascotasCollection } from "../firebase/firebase-config"

export const getPetByUid = async ( uid ) => {
  return await (await mascotasCollection.doc( uid ).get()).data();
  // mascotasCollection.doc( uid ).get()
  //   .then(response => {
  //     console.log('response.data() [mascota]', response.data())
  //     return response.data()
  //   })
  //   .catch(console.error)
}