importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js");



firebase.initializeApp({
  apiKey: "AIzaSyAvN3cc2Xlg4BI1ZZoLgtf-nFi0_ot1vpc",
  authDomain: "hoasenhome---ios.firebaseapp.com",
  projectId: "hoasenhome---ios",
  messagingSenderId: "123600526434",
  storageBucket: "hoasenhome---ios.appspot.com",
  appId: "1:123600526434:web:3c822f0ddfc9662997053b",
  measurementId: "G-GP6XGHT904",
});

const messaging = firebase.messaging();

self.addEventListener("push", function (event) {
  event.waitUntil(() => {
    messaging.onBackgroundMessage((payload) => {
      console.log("message ", payload);
    });
  });
});

messaging.onBackgroundMessage((payload) => {
  console.log("message ", payload);
});



