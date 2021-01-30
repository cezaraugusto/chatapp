import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAzb00TjeYTc6k8YSRYPbQ4RVz-g8SVOro',
  authDomain: 'tribe-cezar.firebaseapp.com',
  projectId: 'tribe-cezar',
  storageBucket: 'tribe-cezar.appspot.com',
  messagingSenderId: '11813997156',
  appId: '1:11813997156:web:68ce9a8db7f40f67ab6d71',
  measurementId: 'G-341K7GCW4R'
}

firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database()
