import Swal from 'sweetalert2'
import { types } from '../types/types'
import { firebase, googleAuthProvider, usersCollection } from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'

export const loginWithEmailPassword = ( email, password ) => {
  return ( dispatch ) => {

    dispatch( startLoading() );

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( async ({ user }) => {
        console.log('user ?? ', user)
        const usuario = await (await usersCollection.doc(user.uid).get()).data();
        console.log('datos del usuario ?? ', usuario)
        dispatch(
          login( user.uid, user.displayName, usuario.rol )
        );
        dispatch( finishLoading() );
      })
      .catch( error => {
        dispatch( finishLoading() );
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#8FD300',
          confirmButtonAriaLabel: 'Continuar'
        });
      });
  }
}

export const registerWithEmailPassword = ( email, password, name ) => {
  return ( dispatch ) => {

    dispatch( startLoading() );

    firebase.auth().createUserWithEmailAndPassword( email, password )
      .then( async ({ user }) => {
        await user.updateProfile({ displayName: name });
        console.log( 'usuario registrado!!', user );
        // const { name, email, password, hospitalName, hospitalDirection } = userData;
        await usersCollection.doc(user.uid).set({
          id: user.uid,
          nombre: name,
          correo: email,
          contrasena: password,
          rol: 'USUARIO'
        });
        dispatch(
          login( user.uid, user.displayName, 'USUARIO' )
        );
        dispatch( finishLoading() );
      })
      .catch(error => {
        dispatch( finishLoading() );
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#8FD300',
          confirmButtonAriaLabel: 'Continuar'
        });
      });
  }
}

export const registerVeterinary = ( userData ) => {
  return ( dispatch ) => {
    dispatch( startLoading() );

    firebase.auth().createUserWithEmailAndPassword( userData.email, userData.password )
      .then( async ({ user }) => {
        await user.updateProfile({ displayName: userData.name });
        console.log( 'veterinario registrado!!', user );
        // registrando usuario en tabla usuarios de firebase
        const { name, email, password, hospitalName, hospitalDirection } = userData;
        await usersCollection.doc(user.uid).set({
          id: user.uid,
          nombre: name,
          correo: email,
          contrasena: password,
          nombreHospital: hospitalName,
          direccionHospital: hospitalDirection,
          rol: 'VETERINARIO'
        });

        dispatch(
          login( user.uid, user.displayName, 'VETERINARIO' )
        );
        dispatch( finishLoading() );
      })
      .catch(error => {
        dispatch( finishLoading() );
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#8FD300',
          confirmButtonAriaLabel: 'Continuar'
        });
      });
  }
}

export const loginWithGoogle = () => {
  return ( dispatch ) => {
    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( ({ user }) => {
        dispatch(
          login( user.uid, user.displayName )
        );
      })
      .catch( error => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#8FD300',
          confirmButtonAriaLabel: 'Continuar'
        });
      });
  }
}

export const login = ( uid, displayName, rol ) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    rol
  }
})

export const asyncLogout = () => {
  return async ( dispatch ) => {
    await firebase.auth().signOut();

    dispatch( logout() );
  }
}

export const logout = () => ({
  type: types.logout
})