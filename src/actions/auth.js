import Swal from 'sweetalert2'
import { types } from '../types/types'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'

export const loginWithEmailPassword = ( email, password ) => {
  return ( dispatch ) => {

    dispatch( startLoading() );

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( ({ user }) => {
        dispatch(
          login( user.uid, user.displayName )
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
        // console.log( 'usuario registrado!!', user );
        dispatch(
          login( user.uid, user.displayName )
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

export const login = ( uid, displayName ) => ({
  type: types.login,
  payload: {
    uid,
    displayName
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