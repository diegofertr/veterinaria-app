import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}
const firebaseAdmin = firebase.initializeApp( firebaseConfig, 'admin' )

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const dbAdmin = firebaseAdmin.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const firebaseAuth = firebaseAdmin.auth()

const usersCollection = db.collection('usuarios');
const fichasCollection = db.collection('fichas');
const mascotasCollection = db.collection('mascotas');

export {
  db,
  dbAdmin,
  googleAuthProvider,
  firebase,
  firebaseAuth,
  usersCollection,
  fichasCollection,
  mascotasCollection
}