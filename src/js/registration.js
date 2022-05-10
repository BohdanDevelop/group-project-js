import { refs } from './refs';

import { initializeApp } from 'firebase/app';

import Notiflix from 'notiflix';

const firebaseConfig = {
  apiKey: 'AIzaSyDc8qgA4c6HBXFARFJCFRqjiSdqL1SZ1O0',
  authDomain: 'team-progect.firebaseapp.com',
  projectId: 'team-progect',
  storageBucket: 'team-progect.appspot.com',
  messagingSenderId: '487556656558',
  appId: '1:487556656558:web:91ec3cf6fc5c251cc8ac3f',
  measurementId: 'G-M5G4XPS7YE',
};

const app = initializeApp(firebaseConfig);

refs.logIn.addEventListener('click', authWithPopup);

import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();
function authWithPopup() {
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      Notiflix.Notify.success(`Hello, ${user.displayName}`);
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    console.log(user);

    // ...
  } else {
    // User is signed out
    // ...
    console.log('pum-pum');
  }
});
