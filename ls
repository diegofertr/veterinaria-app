[1mdiff --git a/src/actions/ficha.js b/src/actions/ficha.js[m
[1mindex 59dedb9..f747059 100644[m
[1m--- a/src/actions/ficha.js[m
[1m+++ b/src/actions/ficha.js[m
[36m@@ -1,10 +1,14 @@[m
 import { db } from "../firebase/firebase-config";[m
[32m+[m
 // import { loadCirugias } from "../helpers/loadCirugias";[m
 import { loadVacunas } from "../helpers/loadVacunas";[m
 import { types } from "../types/types";[m
 [m
 [m
 import { loadCirugias } from '../helpers/loadCirugias';[m
[32m+[m[32mimport { loadDesparacitaciones } from '../helpers/loadDesparacitaciones';[m
[32m+[m[32mimport { loadVitaminas } from '../helpers/loadVitaminas';[m
[32m+[m
 [m
 [m
 export const addVacuna = ( nombreVacuna, descripcion, fecha, fechaRevacunacion ) => {[m
[36m@@ -100,4 +104,103 @@[m [mexport const cargarCirugias = () => {[m
 export const setCirugias = ( cirugias ) => ({[m
   type: types.cirugiasLoad,[m
   payload: cirugias[m
[32m+[m[32m});[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m// logica para desparacitaciones[m
[32m+[m
[32m+[m[32mexport const addDesparacitacion = ( nombre, fecha, descripcion ) => {[m
[32m+[m[32m  return async ( dispatch ) => {[m
[32m+[m[32m    const newDesparacitacion = {[m
[32m+[m[32m      nombre,[m
[32m+[m[32m      fecha,[m
[32m+[m[32m      descripcion,[m
[32m+[m[41m      [m
[32m+[m[32m      createdAt: new Date()[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    await db.collection('desparacitacion').add( newDesparacitacion )[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport const editDesparacitacion = ( id, nombre, descripcion, fecha ) => {[m
[32m+[m[32m  return async ( dispatch ) => {[m
[32m+[m[32m    const newDesparacitacion = {[m
[32m+[m[32m      nombre,[m
[32m+[m[32m      fecha,[m
[32m+[m[32m      descripcion,[m
[32m+[m[32m      updatedAt: new Date()[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    await db.collection('desparacitacion').doc( id ).update( newDesparacitacion )[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport const deleteDesparacitacion = ( id ) => {[m
[32m+[m[32m  return async () => {[m
[32m+[m[32m    await db.collection('desparacitacion').doc( id ).delete();[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport const cargarDesparacitaciones = () => {[m
[32m+[m[32m  return async ( dispatch ) => {[m
[32m+[m[32m    const desparacitaciones = await loadDesparacitaciones();[m
[32m+[m[32m    dispatch( setDesparacitaciones( desparacitaciones ) );[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport const setDesparacitaciones = ( desparacitaciones ) => ({[m
[32m+[m[32m  type: types.desparacitacionesLoad,[m
[32m+[m[32m  payload: desparacitaciones[m
[32m+[m[32m});[m
[32m+[m
[32m+[m
[32m+[m[32m// logica para vitaminas[m
[32m+[m
[32m+[m
[32m+[m[32mexport const addVitamina = ( nombre, fecha, proxDosis, descripcion) => {[m
[32m+[m[32m  return async ( dispatch ) => {[m
[32m+[m[32m    const newVitamina = {[m
[32m+[m[32m      nombre,[m
[32m+[m[32m      fecha,[m
[32m+[m[32m      proxDosis,[m
[32m+[m[32m      descripcion,[m
[32m+[m[32m      createdAt: new Date()[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    await db.collection('vitamina').add( newVitamina )[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport const editVitamina = ( id, nombre, fecha, proxDosis, descripcion ) => {[m
[32m+[m[32m  return async ( dispatch ) => {[m
[32m+[m[32m    const newVitamina = {[m
[32m+[m[32m      nombre,[m
[32m+[m[32m      fecha,[m
[32m+[m[32m      proxDosis,[m
[32m+[m[32m      descripcion,[m
[32m+[m[32m      updatedAt: new Date()[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m    await db.collection('vitamina').doc( id ).update( newVitamina )[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport const deleteVitamina= ( id ) => {[m
[32m+[m[32m  return async () => {[m
[32m+[m