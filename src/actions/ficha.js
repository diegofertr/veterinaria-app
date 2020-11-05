import { db } from "../firebase/firebase-config";
import { loadVacunas } from "../helpers/loadVacunas";
import { types } from "../types/types";

export const addVacuna = ( nombreVacuna, descripcion, fecha, fechaRevacunacion ) => {
  return async ( dispatch ) => {
    const newVacuna = {
      nombreVacuna,
      descripcion,
      fecha,
      fechaRevacunacion,
      createdAt: new Date()
    };

    await db.collection('vacuna').add( newVacuna )
  }
}

export const editVacuna = ( id, nombreVacuna, descripcion, fecha, fechaRevacunacion ) => {
  return async ( dispatch ) => {
    const newVacuna = {
      nombreVacuna,
      descripcion,
      fecha,
      fechaRevacunacion,
      updatedAt: new Date()
    };

    await db.collection('vacuna').doc( id ).update( newVacuna )
  }
}

export const deleteVacuna= ( id ) => {
  return async () => {
    await db.collection('vacuna').doc( id ).delete();
  }
}

export const cargarVacunas = () => {
  return async ( dispatch ) => {
    const vacunas = await loadVacunas();
    dispatch( setVacunas( vacunas ) );
  }
}

export const setVacunas = ( vacunas ) => ({
  type: types.vacunasLoad,
  payload: vacunas
});