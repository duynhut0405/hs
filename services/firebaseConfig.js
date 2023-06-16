import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAvN3cc2Xlg4BI1ZZoLgtf-nFi0_ot1vpc",
    authDomain: "hoasenhome---ios.firebaseapp.com",
    projectId: "hoasenhome---ios",
    storageBucket: "hoasenhome---ios.appspot.com",
    messagingSenderId: "123600526434",
    appId: "1:123600526434:web:3c822f0ddfc9662997053b",
    measurementId: "G-GP6XGHT904",
  });
}

export default firebase;
