import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import {
  Dialog,
  FlatButton,
  TextField,
} from 'material-ui';
import db from '../../shared/firebase';
import './dialog-form-friend.css';


class DialogFormFriend extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.open !== this.state.open) {
      this.setState({
        open: !this.state.open,
      });
    }
    this.setState({
      ...this.state,
      ...nextProps,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
    this.props.close();
  }

  updateMySaveObj(obj, attr, firestoreAttr, format) {
    const newObj = obj;
    if (this.props[attr] !== this.state[attr]) {
      if (firestoreAttr) {
        newObj[firestoreAttr] = format ? format(this.state[attr]) : this.state[attr];
      } else {
        newObj[attr] = format ? format(this.state[attr]) : this.state[attr];
      }
    }
    return newObj;
  }

  handleSubmit() {
    let friend = {};
    let friendLoc = {};
    friend = this.updateMySaveObj(friend, 'lastName', 'last_name');
    friend = this.updateMySaveObj(friend, 'firstName', 'first_name');
    friend = this.updateMySaveObj(friend, 'age', null, parseInt);
    friend = this.updateMySaveObj(friend, 'hobbies');

    friendLoc = this.updateMySaveObj(friendLoc, 'city');
    friendLoc = this.updateMySaveObj(friendLoc, 'state');
    friendLoc = this.updateMySaveObj(friendLoc, 'country');
    friendLoc = this.updateMySaveObj(friendLoc, 'lat', null, parseFloat);
    friendLoc = this.updateMySaveObj(friendLoc, 'long', null, parseFloat);

    const friendQuery = db.collection('friends');
    const locQuery = db.collection('friend_location');
    if (this.props.id) {
      friendQuery.doc(this.props.id).set({
        ...friend,
      }, { merge: true });
      locQuery.doc(this.props.locationId).set({
        ...friendLoc,
      }, { merge: true });
    } else {
      locQuery.add({ ...friendLoc }).then((docR) => {
        friend.location = docR.id;
        friendQuery.add({ ...friend });
      });
    }
    this.setState({
      open: false,
    });

    this.props.close();
  }

  handleChange(attr, value) {
    this.setState({
      ...this.state,
      [attr]: value,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => { this.handleClose(); }}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={() => { this.handleSubmit(); }}
      />,
    ];
    return (
      <div className="friend-form">
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => { this.handleClose(); }}
        >
          <form
            onSubmit={() => { this.handleSubmit(); }}
            style={{ display: 'inline-grid' }}
          >
            <div className="form-container info">
              <TextField
                hintText="friend's last name"
                floatingLabelText="Last Name"
                value={this.state.lastName}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('lastName', v); }}
              />
              <TextField
                hintText="friend's first name"
                floatingLabelText="First Name"
                value={this.state.firstName}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('firstName', v); }}
              />
            </div>
            <div className="form-container info">
              <TextField
                hintText="friend's Age"
                floatingLabelText="Age"
                value={this.state.age}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('age', v); }}
              />
              <TextField
                hintText="friend's hobbies"
                floatingLabelText="Hobby"
                value={this.state.hobbies}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('hobbies', v); }}
              />
            </div>
            <div className="form-container location">
              <TextField
                hintText="friend's City"
                floatingLabelText="City"
                value={this.state.city}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('city', v); }}
              />
              <TextField
                hintText="friend's State"
                floatingLabelText="State"
                value={this.state.state}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('state', v); }}
              />
              <TextField
                hintText="friend's Country"
                floatingLabelText="Country"
                value={this.state.country}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('country', v); }}
              />
            </div>
            <div className="form-container location lat-long">
              <TextField
                hintText="friend's Latitude"
                floatingLabelText="Latitude"
                value={this.state.lat}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('lat', v); }}
              />
              <TextField
                hintText="friend's Longitude"
                floatingLabelText="Longitude"
                value={this.state.long}
                floatingLabelFixed
                onChange={(e, v) => { this.handleChange('long', v); }}
              />
            </div>
          </form>
        </Dialog>
      </div>);
  }
}

DialogFormFriend.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  close: PropTypes.func,
  id: PropTypes.string, // eslint-disable-line
  lastName: PropTypes.string, // eslint-disable-line
  firstName: PropTypes.string, // eslint-disable-line
  hobbies: PropTypes.string, // eslint-disable-line
  age: PropTypes.number, // eslint-disable-line
  locationId:PropTypes.string, // eslint-disable-line
  country: PropTypes.string, // eslint-disable-line
  state: PropTypes.string, // eslint-disable-line
  city: PropTypes.string, // eslint-disable-line
};

export default pure(DialogFormFriend);
