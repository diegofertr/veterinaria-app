import Swal from "sweetalert2";

const { usersCollection } = require("../firebase/firebase-config");

export const getUserByEmail = async ( email ) => {
  let user = {};
  const querySnapshot = await usersCollection.where( 'correo', '==', email ).get();
  console.log( 'querySnapshot :: ', querySnapshot )
  if ( !querySnapshot ) Swal.fire( 'Error al obtener el usuario', 'Ocurrió un error al intentar obtener los datos del usuario', 'error' );
  querySnapshot.forEach(doc => {
    user.uid = doc.id;
    user.data = doc.data();
  })

  console.log('[getUserByEmail] ->', user)
  return user;
}