const { usersCollection } = require("../firebase/firebase-config");

export const getUserByUid = async ( uid ) => {
  return await (await usersCollection.doc( uid ).get()).data();
}

export const getUsersByRol = async ( rol ) => {
  let users = [];
  const querySnapshot = await usersCollection.where( 'rol', '==', rol ).get();
  console.log( 'querySnapshot :: ', querySnapshot )
  // if ( !querySnapshot ) Swal.fire( 'Error al obtener el usuario', 'Ocurrió un error al intentar obtener los datos del usuario', 'error' );
  querySnapshot.forEach(doc => {
    // user.uid = doc.id;
    // user.data = doc.data();
    users.push({
      uid: doc.id,
      ...doc.data()
    })
  })

  console.log('[getUsersByRol] ->', users)
  return users;
}