# DevFest Demo
A cool react js project for demonstrating neat firebase features


Usage Firebase with Firestore
=============================
1.  [Create a firebase account](https://firebase.google.com/)
2.  Add a project on admin portal
3.  In the App portal on the left, choose Database
4.  Select Cloud Firestore
5.  Add a Collection names "Country"
6.  For the Collection's new Document, add the following fields.
  * Capital
  * Country
  * Population
  * Latitude
  * Longitude

    


Usage React
===========
1.  Clone the repo (Get it from above) 
2.  `nvm use` (Make sure to have nvm. You will need node 8.0.0)
3.  `npm install` (Install all the fun packages)
4.  Within react-firestorm/src/App.js replace the following within the config variable:
  * `<ApiKey>`
  * `<Project-ID>`
  (You should be able to find these in your app settings in the firebase console)
4.  `npm start` (Enjoy!)
  
