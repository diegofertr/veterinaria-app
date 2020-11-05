import { pets } from "../data/pets"

export const getPetByUid = ( uid ) => {
  return pets.find( p => p.uid === uid)
}