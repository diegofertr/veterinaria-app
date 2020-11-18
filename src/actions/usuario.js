import { usersCollection } from "../firebase/firebase-config";
import { loadUsuarios } from "../helpers/loadUsuarios";
import { types } from "../types/types";

export const addUsuario = ( usuario ) => {
  return async ( dispatch ) => {
    const usuarioData = {
      ...usuario,
      createdAt: new Date()
    };

    await usersCollection.add( usuarioData )
  }
}

export const editUsuario = ( id, usuario ) => {
  return async ( dispatch ) => {
    const usuarioData = {
      ...usuario,
      updatedAt: new Date()
    };

    await usersCollection.doc( id ).update( usuarioData )
  }
}

export const deleteUsuario= ( id ) => {
  return async () => {
    await usersCollection.doc( id ).delete();
  }
}

export const cargarUsuarios = () => {
  return async ( dispatch ) => {
    const usuarios = await loadUsuarios();
    console.log( 'usuarios from firebase :: ', usuarios )
    dispatch( setUsuarios( usuarios ) );
  }
}

export const setUsuarios = ( usuarios ) => ({
  type: types.usuariosLoad,
  payload: usuarios
});