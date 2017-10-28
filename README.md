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
1.  [Install Git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2.  Clone the repo (Get it from above) 
3.  Install npm (https://nodejs.org/en/download/)
4.  Install nvm (npm install nvm)
3.  `nvm use` (Make sure to have nvm. You will need node 8.0.0)
4.  `npm install` (Install all the fun packages or Yarn)
5.  Within react-firestorm/src/shared/firebase.js replace the following within the config variable:
  * `<ApiKey>`
  * `<Project-ID>`
  (You should be able to find these in your app settings in the firebase console)
6.  `npm start` (Enjoy!)
  
