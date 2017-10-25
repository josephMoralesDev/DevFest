import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import firebase from 'firebase';
// import _ from 'lodash';

import './App.css';
/* eslint-disable react/no-array-index-key */
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
firebase.initializeApp(config);
const db = firebase.firestore();


/**
* @{event}
* remove data from firebase based off key
*/
const removeCountry = (event) => {
  db.collection('Country').doc(event.target.id).delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryInput: '',
      capitalInput: '',
      populationInput: '',
      longitudeInput: '',
      latitudeInput: '',
      data: null,
    };
  }

  componentDidMount() {
    this.getFireStoreData();
  }

  /**
  * find Country collection
  * grab all countries and listen for changes.
  * set new state when data is grabbed.
  * onSnapshot attaches a listen for new data in firestore
  */
  getFireStoreData() {
    db.collection('Country').onSnapshot((querySnapshot) => {
      const newData = {};
      querySnapshot.forEach((doc) => {
        newData[doc.id] = doc.data();
      });
      this.setState({ data: newData });
    });
  }

  /**
  * @{event}
  * Change the value of state.key based on id of input
  */
  handleChange(event) {
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  }

  /**
  * @{event}
  * Submit new data to firebase
  */
  submitCountry(event) {
    event.preventDefault();
    const {
      countryInput,
      capitalInput,
      populationInput,
      longitudeInput,
      latitudeInput,
    } = this.state;

    db.collection('Country').add({
      Country: countryInput,
      Capital: capitalInput,
      Latitude: latitudeInput,
      Longitude: longitudeInput,
      Population: populationInput,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="My Friends"
        />
        {this.state.data && Object.keys(this.state.data).map((country, i) => (
          <ul key={`${country}-${i}`}>
            <li>
              Country - {this.state.data[country].Country}
            </li>
            <li>
              Capital - {this.state.data[country].Capital}
            </li>
            <li>
              Population - {this.state.data[country].Population}
            </li>
            <li>
              Longitude - {this.state.data[country].Longitude}
            </li>
            <li>
              Latitude -{this.state.data[country].Latitude}
            </li>
            <button id={country} onClick={removeCountry}>remove country</button>
          </ul>
        ))}
        <form onSubmit={this.submitCountry} style={{ display: 'inline-grid' }}>
          <h1>Add a Country</h1>
          Country: <input value={this.state.countryInput} type="text" id="countryInput" onChange={(e) => { this.handleChange(e); }} />
          Capital: <input value={this.state.capitalInput} type="text" id="capitalInput" onChange={(e) => { this.handleChange(e); }} />
          Population: <input value={this.state.populationInput} type="text" id="populationInput" onChange={(e) => { this.handleChange(e); }} />
          Longitude: <input value={this.state.longitudeInput} type="text" id="longitudeInput" onChange={(e) => { this.handleChange(e); }} />
          Latitude: <input value={this.state.latitudeInput} type="text" id="latitudeInput" onChange={(e) => { this.handleChange(e); }} />
          <input type="submit" value="Submit" />
        </form>
      </MuiThemeProvider>
    );
  }
}

export default App;
