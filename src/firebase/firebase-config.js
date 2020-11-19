import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
}
const firebaseAdmin = firebase.initializeApp( firebaseConfig, 'admin' )

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const dbAdmin = firebaseAdmin.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const firebaseAuth = firebaseAdmin.auth()

const usersCollection = db.collection('usuarios');
const fichasCollection = db.collection('fichas');
const vacunasCollection = db.collection('vacunas');
const cirugiasCollection = db.collection('cirugias');
const desparacitacionesCollection = db.collection('desparacitaciones');
const vitaminasCollection = db.collection('vitaminas');
const mascotasCollection = db.collection('mascotas');

export {
  db,
  dbAdmin,
  googleAuthProvider,
  firebase,
  firebaseAuth,
  usersCollection,
  fichasCollection,
  vacunasCollection,
  cirugiasCollection,
  desparacitacionesCollection,
  vitaminasCollection,
  mascotasCollection
}