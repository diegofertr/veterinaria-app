import {
  cirugiasCollection,
  desparacitacionesCollection,
  fichasCollection,
  mascotasCollection,
  vacunasCollection,
  vitaminasCollection
} from "../firebase/firebase-config";

// import { loadCirugias } from "../helpers/loadCirugias";
import { loadVacunas } from "../helpers/loadVacunas";
import { types } from "../types/types";


import { loadCirugias } from '../helpers/loadCirugias';
import { loadDesparacitaciones } from '../helpers/loadDesparacitaciones';
import { loadVitaminas } from '../helpers/loadVitaminas';
import { loadFichas } from "../helpers/loadFichas";



export const addFicha = ( idVeterinario, idMascota ) => {
  return async ( dispatch ) => {
    const newFicha = {
      idMascota,
      idVeterinario,
      createdAt: new Date()
    };

    const ficha = await fichasCollection.add( newFicha )
    console.log( 'ficha creada!!', ficha )
    await mascotasCollection.doc( idMascota ).update({
      idFicha: ficha.id
    })
    dispatch( setFicha( ficha.id ) )
  }
}

export const setFicha = ( idFicha ) => ({
  type: types.fichaLoad,
  payload: idFicha
});

export const cargarFichas = ( uid ) => {
  return async ( dispatch ) => {
    const fichas = await loadFichas( uid )
    console.log( 'get FICHAS  ::: ', fichas )
    dispatch( setFichas( fichas ) )
  }
}

export const setFichas = ( fichas ) => ({
  type: types.fichasLoad,
  payload: fichas
})


// logica para vacunas
export const addVacuna = ( idFicha, nombreVacuna, descripcion, fecha, fechaRevacunacion ) => {
  return async ( dispatch ) => {
    const newVacuna = {
      idFicha,
      nombreVacuna,
      descripcion,
      fecha,
      fechaRevacunacion,
      createdAt: new Date()
    };

    await vacunasCollection.add( newVacuna )
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

    await vacunasCollection.doc( id ).update( newVacuna )
  }
}

export const deleteVacuna= ( id ) => {
  return async () => {
    await vacunasCollection.doc( id ).delete();
  }
}

export const cargarVacunas = ( idFicha ) => {
  return async ( dispatch ) => {
    const vacunas = await loadVacunas( idFicha );
    dispatch( setVacunas( vacunas ) );
  }
}

export const setVacunas = ( vacunas ) => ({
  type: types.vacunasLoad,
  payload: vacunas
});




// logica para cirugias

export const addCirugia = ( idFicha, tipo, fecha, observacion ) => {
  return async ( dispatch ) => {
    const newCirugia = {
      idFicha,
      tipo,
      fecha,
      observacion,
      createdAt: new Date()
    };

    await cirugiasCollection.add( newCirugia )
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

    await cirugiasCollection.doc( id ).update( newCirugia )
  }
}

export const deleteCirugia = ( id ) => {
  return async () => {
    await cirugiasCollection.doc( id ).delete();
  }
}

export const cargarCirugias = ( idFicha ) => {
  return async ( dispatch ) => {
    const cirugias = await loadCirugias( idFicha );
    dispatch( setCirugias( cirugias ) );
  }
}

export const setCirugias = ( cirugias ) => ({
  type: types.cirugiasLoad,
  payload: cirugias
});



// logica para desparacitaciones

export const addDesparacitacion = ( idFicha, nombre, fecha, descripcion ) => {
  return async ( dispatch ) => {
    const newDesparacitacion = {
      idFicha,
      nombre,
      fecha,
      descripcion,
      createdAt: new Date()
    };

    await desparacitacionesCollection.add( newDesparacitacion )
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

    await desparacitacionesCollection.doc( id ).update( newDesparacitacion )
  }
}

export const deleteDesparacitacion = ( id ) => {
  return async () => {
    await desparacitacionesCollection.doc( id ).delete();
  }
}

export const cargarDesparacitaciones = ( idFicha ) => {
  return async ( dispatch ) => {
    const desparacitaciones = await loadDesparacitaciones( idFicha );
    dispatch( setDesparacitaciones( desparacitaciones ) );
  }
}

export const setDesparacitaciones = ( desparacitaciones ) => ({
  type: types.desparacitacionesLoad,
  payload: desparacitaciones
});


// logica para vitaminas


export const addVitamina = ( idFicha, nombre, fecha, proxDosis, descripcion) => {
  return async ( dispatch ) => {
    const newVitamina = {
      idFicha,
      nombre,
      fecha,
      proxDosis,
      descripcion,
      createdAt: new Date()
    };

    await vitaminasCollection.add( newVitamina )
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

    await vitaminasCollection.doc( id ).update( newVitamina )
  }
}

export const deleteVitamina= ( id ) => {
  return async () => {
    await vitaminasCollection.doc( id ).delete();
  }
}

export const cargarVitaminas = ( idFicha ) => {
  return async ( dispatch ) => {
    const vitaminas = await loadVitaminas( idFicha );
    dispatch( setVitaminas( vitaminas ) );
  }
}

export const setVitaminas = ( vitaminas ) => ({
  type: types.vitaminasLoad,
  payload: vitaminas
});