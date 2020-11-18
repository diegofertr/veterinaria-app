import { usersCollection } from "../firebase/firebase-config"

export const loadUsuarios = async () => {

  const usuariosSnap = await usersCollection.orderBy('createdAt', 'desc').get();
  const usuarios = [];

  usuariosSnap.forEach( snap => {
    usuarios.push({
      id: snap.id,
      ...snap.data()
    });
  });

  return usuarios;
}