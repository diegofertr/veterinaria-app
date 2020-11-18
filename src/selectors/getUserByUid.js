const { usersCollection } = require("../firebase/firebase-config");

export const getUserByUid = async ( uid ) => {
  return await (await usersCollection.doc( uid ).get()).data();
}