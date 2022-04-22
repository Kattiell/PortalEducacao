const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} = require('firebase/auth');

var serviceAccount = {
    apiKey: "AIzaSyDyD0yoRg1BsRZj56TuoJJlcgXsJdM5K8U",
    authDomain: "portaeducacao.firebaseapp.com",
    databaseURL: "https://portaeducacao-default-rtdb.firebaseio.com",
    projectId: "portaeducacao",
    storageBucket: "portaeducacao.appspot.com",
    messagingSenderId: "588246715446",
    appId: "1:588246715446:web:aa9fc4ee1cf0bb8de55c97",
    measurementId: "G-9K2YJ35WY1"
  };//metodo de segurança

var app = initializeApp(serviceAccount)

const auth = getAuth(app);

module.exports = {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
}