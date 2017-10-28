import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');


/**
* initialize firebase and firestore service
* must provide API Key
*/
const config = {
  apiKey: 'AIzaSyAJLQueePRWUhIs5oJTd9HxP9AJAdlWbZw',
  authDomain: 'devfest-b8421.firebaseapp.com',
  projectId: 'devfest-b8421',
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
