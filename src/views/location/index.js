import React, { PureComponent } from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Map, TileLayer } from 'react-leaflet';
import pure from 'recompose/pure';

import './location.css';

class Location extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lat: 20,
      lng: 50,
      zoom: 1.5,
      isLoading: true,
    };
  }

  getStringPopup(marker) { // eslint-disable-line
    return (`
      <span>
        <p>${marker.last_name}, ${marker.first_name}</p>
        <br />
      </span>`);
  }

  doneLoading() {
    setTimeout(() => this.setState({
      ...this.state,
      isLoading: false,
    }), 0);
  }

  render() {
    const markerPoints = [];
    const centerPosition = [this.state.lat, this.state.lng];
    const mapBounds = new L.LatLngBounds([400.67351256610522, -400.0234375], [-400.995311187950925, 400.2421875]);
    return (
      <div className="location">
        <h2>Where are my friends?</h2>
        {this.state.isLoading && (
          <div className="grayed-out">
            <div className="loading-map">
              <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
              <span className="sr-only">Loading...</span>
            </div>
          </div>)}
        <Map
          center={centerPosition}
          minZoom={2}
          maxZoom={15}
          zoom={this.state.zoom}
          maxBounds={mapBounds}
          scrollWheelZoom={false}
        >
          <TileLayer
            /* attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" */
            attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>, <a href=&quot;http://creativecommons.org/licenses/by/3.0&quot;>CC BY 3.0</a> &mdash; Map data &copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a>"
            url="https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            continuousWorld={false}
            noWrap
          />
          {this.props.friends && this.props.friends.forEach((item, index) => {
            const marker = item;
            if (index === this.props.friends.length - 1) this.doneLoading();
            if (marker && marker.lat
              && marker.long) {
              const markerStyle = L.divIcon({
                className: 'marker',
                html: '<i class="fa fa-2x fa-user-o" aria-hidden="true" />',
              });
              markerPoints.push({
                lat: marker.lat,
                lng: marker.long,
                options: { icon: markerStyle },
                popup: this.getStringPopup(marker),
              });
            }
          })}<MarkerClusterGroup
            wrapperOptions={{ enableDefaultStyle: true }}
            markers={markerPoints}
          />
        </Map>
      </div>
    );
  }
}

Location.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    hobbies: PropTypes.string,
    age: PropTypes.number,
    locationId:PropTypes.string, // eslint-disable-line
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
  })),
};

const mapStateToProps = state => ({
  friends: state.friends.data,
});

const mapDispatchToProps = () => ({});

export default pure(connect(mapStateToProps, mapDispatchToProps)(Location));
