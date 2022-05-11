import { refs } from './refs';
import { initializeApp } from 'firebase/app';
import Notiflix from 'notiflix';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { openHomePage } from './alternate-pages';

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
refs.logOut.addEventListener('click', onClickLogOut);

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
    declineAccess();
    console.log(user);

    // ...
  } else {
    authAccess();
    // User is signed out
    // ...
    console.log('pum-pum');
  }
});

function hiddenToggle(refs, flag = true) {
  refs.hidden = flag;
}

function declineAccess(user) {
  hiddenToggle(refs.libraryPage, false);
  hiddenToggle(refs.logIn);
  hiddenToggle(refs.logOut, false);
}

function authAccess(user) {
  hiddenToggle(refs.libraryPage);
  hiddenToggle(refs.logIn, false);
  hiddenToggle(refs.logOut);
}

function onClickLogOut() {
  signOut(auth)
    .then(() => {
      openHomePage();
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}
