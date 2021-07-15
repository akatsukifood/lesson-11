import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCtSXWcx3hjHRs1frpq1opKud4N8M9l0t0",
  authDomain: "crwn-db-957bb.firebaseapp.com",
  databaseURL: "https://crwn-db-957bb.firebaseio.com",
  projectId: "crwn-db-957bb",
  storageBucket: "crwn-db-957bb.appspot.com",
  messagingSenderId: "416188603237",
  appId: "1:416188603237:web:df38766de78110c5331f8c",
  measurementId: "G-3L9W0WEGMJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
