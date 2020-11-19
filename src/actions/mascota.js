import { mascotasCollection } from "../firebase/firebase-config";
import { loadMascotas } from "../helpers/loadMascotas";
import { types } from "../types/types";

export const addMascota = ( usuarioId, nombre, edad, raza, especie, urlImage ) => {
  return async ( dispatch ) => {
    const newMascota = {
      usuarioId,
      nombre,
      edad,
      raza,
      especie,
      urlImage,
      createdAt: new Date()
    };

    await mascotasCollection.add( newMascota )
    // dispatch( cargarMascotas( userId ) )
  }
}

export const editMascota = ( id, mascota ) => {
  return async ( dispatch ) => {
    const mascotaData = {
      ...mascota,
      updatedAt: new Date()
    };

    await mascotasCollection.doc( id ).update( mascotaData )
  }
}

export const deleteMascota= ( id ) => {
  return async ( dispatch ) => {
    await mascotasCollection.doc( id ).delete();
  }
}

export const cargarMascotas = ( userId ) => {
  return async ( dispatch ) => {
    const mascotas = await loadMascotas( userId );
    dispatch( setMascotas( mascotas ) );
  }
}

export const setMascotas = ( mascotas ) => ({
  type: types.mascotasLoad,
  payload: mascotas
});