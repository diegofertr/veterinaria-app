import { db } from "../firebase/firebase-config";
// import { loadCirugias } from "../helpers/loadCirugias";
import { loadVacunas } from "../helpers/loadVacunas";
import { types } from "../types/types";


import { loadCirugias } from '../helpers/loadCirugias';


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




// logica para cirugias

export const addCirugia = ( tipo, fecha, observacion ) => {
  return async ( dispatch ) => {
    const newCirugia = {
      tipo,
      fecha,
      observacion,
      createdAt: new Date()
    };

    await db.collection('cirugia').add( newCirugia )
  }
}

export const editCirugia = ( id, tipo, fecha, observacion ) => {
  return async ( dispatch ) => {
    const newCirugia = {
      tipo,
      fecha,
      observacion,
      updatedAt: new Date()
    };

    await db.collection('cirugia').doc( id ).update( newCirugia )
  }
}

export const deleteCirugia = ( id ) => {
  return async () => {
    await db.collection('cirugia').doc( id ).delete();
  }
}

export const cargarCirugias = () => {
  return async ( dispatch ) => {
    const cirugias = await loadCirugias();
    dispatch( setCirugias( cirugias ) );
  }
}

export const setCirugias = ( cirugias ) => ({
  type: types.cirugiasLoad,
  payload: cirugias
});