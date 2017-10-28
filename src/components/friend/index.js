import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import pure from 'recompose/pure';
import db from '../../shared/firebase';
import DialogFormFriend from '../dialog-form-friend';

import './friend.css';

class Friends extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      delete: false,
    };
  }

  handleEdit() {
    this.setState({
      ...this.state,
      edit: true,
    });
  }

  handleEditClose() {
    this.setState({
      ...this.state,
      edit: false,
    });
  }

  handleDelete() {
    if (this.props.locationId) {
      db.collection('friend_location').doc(this.props.locationId)
        .delete().then(() => {
          if (this.props.id) {
            db.collection('friends').doc(this.props.id).delete();
          }
        });
    } else if (this.props.id) {
      db.collection('friends').doc(this.props.id).delete();
    }
  }

  render() {
    return (
      <div className="friend">
        <Paper zDepth={2}>
          <h2>{`${this.props.lastName}, ${this.props.firstName}`} <small>- {this.props.age} yoa</small></h2>
          <div className="friend-info">
            <p className="title">
              <i className="fa fa-2x fa-globe" aria-hidden="true" />
              <b>Location: </b>
            </p>
            <p className="item">{this.props.city}, {this.props.state} - {this.props.country}</p>
            <p className="title">
              <i className="fa fa-2x fa-gamepad" aria-hidden="true" />
              <b>Hobbies: </b>
            </p>
            <p className="item">{this.props.hobbies}</p>
          </div>
          <BottomNavigation>
            <BottomNavigationItem
              label="Edit"
              icon={<i className="fa fa-pencil-square-o" aria-hidden="true" />}
              onClick={() => { this.handleEdit(); }}
            />
            <BottomNavigationItem
              label="Delete"
              icon={<i className="fa fa-trash" aria-hidden="true" />}
              onClick={() => { this.handleDelete(); }}
            />
          </BottomNavigation>
        </Paper>
        <DialogFormFriend
          title="Edit Your Friend"
          open={this.state.edit}
          close={() => { this.handleEditClose(); }}
          id={this.props.id}
          lastName={this.props.lastName}
          firstName={this.props.firstName}
          hobbies={this.props.hobbies}
          age={this.props.age}
          country={this.props.country}
          state={this.props.state}
          city={this.props.city}
          locationId={this.props.locationId}
          lat={this.props.lat}
          long={this.props.long}
        />
      </div>
    );
  }
}

Friends.propTypes = {
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
};

export default pure(Friends);
