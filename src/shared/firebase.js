import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');


/**
* initialize firebase and firestore service
* must provide API Key
*/
const config = {
  apiKey: '<ApiKey>',
  authDomain: '<Project-ID>.firebaseapp.com',
  projectId: '<Project-ID>',
};

let db = null;
const getFirebaseDB = () => {
  if (db === null) {
    firebase.initializeApp(config);
    db = firebase.firestore();
  }
  return db;
};

export default getFirebaseDB();
