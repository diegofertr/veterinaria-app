import { db } from "../firebase/firebase-config";

// import { loadCirugias } from "../helpers/loadCirugias";
import { loadVacunas } from "../helpers/loadVacunas";
import { types } from "../types/types";


import { loadCirugias } from '../helpers/loadCirugias';
import { loadDesparacitaciones } from '../helpers/loadDesparacitaciones';
import { loadVitaminas } from '../helpers/loadVitaminas';



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



// logica para desparacitaciones

export const addDesparacitacion = ( nombre, fecha, descripcion ) => {
  return async ( dispatch ) => {
    const newDesparacitacion = {
      nombre,
      fecha,
      descripcion,
      
      createdAt: new Date()
    };

    await db.collection('desparacitacion').add( newDesparacitacion )
  }
}

export const editDesparacitacion = ( id, nombre, descripcion, fecha ) => {
  return async ( dispatch ) => {
    const newDesparacitacion = {
      nombre,
      fecha,
      descripcion,
      updatedAt: new Date()
    };

    await db.collection('desparacitacion').doc( id ).update( newDesparacitacion )
  }
}

export const deleteDesparacitacion = ( id ) => {
  return async () => {
    await db.collection('desparacitacion').doc( id ).delete();
  }
}

export const cargarDesparacitaciones = () => {
  return async ( dispatch ) => {
    const desparacitaciones = await loadDesparacitaciones();
    dispatch( setDesparacitaciones( desparacitaciones ) );
  }
}

export const setDesparacitaciones = ( desparacitaciones ) => ({
  type: types.desparacitacionesLoad,
  payload: desparacitaciones
});


// logica para vitaminas


export const addVitamina = ( nombre, fecha, proxDosis, descripcion) => {
  return async ( dispatch ) => {
    const newVitamina = {
      nombre,
      fecha,
      proxDosis,
      descripcion,
      createdAt: new Date()
    };

    await db.collection('vitamina').add( newVitamina )
  }
}

export const editVitamina = ( id, nombre, fecha, proxDosis, descripcion ) => {
  return async ( dispatch ) => {
    const newVitamina = {
      nombre,
      fecha,
      proxDosis,
      descripcion,
      updatedAt: new Date()
    };

    await db.collection('vitamina').doc( id ).update( newVitamina )
  }
}

export const deleteVitamina= ( id ) => {
  return async () => {
    await db.collection('vitamina').doc( id ).delete();
  }
}

export const cargarVitaminas = () => {
  return async ( dispatch ) => {
    const vitaminas = await loadVitaminas();
    dispatch( setVitaminas( vitaminas ) );
  }
}

export const setVitaminas = ( vitaminas ) => ({
  type: types.vitaminasLoad,
  payload: vitaminas
});