import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

/**
* initialize firebase and firestore service
* must provide API Key
*/
var config = {
  apiKey: "<ApiKey>",
  authDomain: "<Project-ID>.firebaseapp.com",
  projectId: "<Project-ID>-b8421",
};
firebase.initializeApp(config);
var db = firebase.firestore();

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
    this.getFireStoreData = this.getFireStoreData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitCountry = this.submitCountry.bind(this);
    this.removeCountry = this.removeCountry.bind(this);
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
    console.log('oh god');
    db.collection("Country").onSnapshot((querySnapshot) => {
      var newData = {};
      querySnapshot.forEach((doc) => {
        newData[doc.id] = doc.data();
      });
      this.setState({data: newData});
    });
  }

  /**
  * @{event}
  * Change the value of state.key based on id of input
  */
  handleChange(event) {
    this.setState({...this.state, [event.target.id]: event.target.value})
  }

  /**
  * @{event}
  * Submit new data to firebase
  */
  submitCountry(event){
    event.preventDefault();
    const { countryInput,
      capitalInput,
      populationInput,
      longitudeInput,
      latitudeInput
    } = this.state;

    db.collection("Country").add({
        Country: countryInput,
        Capital: capitalInput,
        Latitude: latitudeInput,
        Longitude: longitudeInput,
        Population: populationInput,
      })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  /**
  * @{event}
  * remove data from firebase based off key
  */
  removeCountry(event) {
    db.collection("Country").doc(event.target.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.data && Object.keys(this.state.data).map((country, i) => {
          return [
            <ul key={i+country}>
              <li key={i+this.state.data[country].Country}>
                Country - {this.state.data[country].Country}
              </li>
              <li key={i+this.state.data[country].Capital}>
                Capital - {this.state.data[country].Capital}
              </li>
              <li key={i+this.state.data[country].Population}>
                Population - {this.state.data[country].Population}
              </li>
              <li key={i+this.state.data[country].Longitude}>
                Longitude - {this.state.data[country].Longitude}
              </li>
              <li key={i+this.state.data[country].Latitude}>
                Latitude -{this.state.data[country].Latitude}
              </li>
              <button id={country} onClick={this.removeCountry}>remove country</button>
            </ul>
          ];
        })}
          <form onSubmit={this.submitCountry} style={{ display: 'inline-grid'}}>
            <h1>Add a Country</h1>
            Country: <input value={this.state.countryInput} type="text" id="countryInput" onChange={this.handleChange}/>
            Capital: <input value={this.state.capitalInput} type="text" id="capitalInput" onChange={this.handleChange}/>
            Population: <input value={this.state.populationInput} type="text" id="populationInput" onChange={this.handleChange}/>
            Longitude: <input value={this.state.longitudeInput} type="text" id="longitudeInput" onChange={this.handleChange}/>
            Latitude: <input value={this.state.latitudeInput} type="text" id="latitudeInput" onChange={this.handleChange}/>
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default App;
