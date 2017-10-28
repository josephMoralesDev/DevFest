import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  RaisedButton,
} from 'material-ui';
import pure from 'recompose/pure';
import MyFriend from '../../components/friend';
import DialogFormFriend from '../../components/dialog-form-friend';
import db from '../../shared/firebase';
import {
  setFriends,
} from '../../actions/friends';
import './home.css';


class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // myFriendsData: null,
      add: false,
    };
  }

  componentDidMount() {
    db.collection('friends').onSnapshot((queryMyFriend) => {
      const myFriendsData = [];
      const sizeMyfriends = queryMyFriend.size;
      let index = 0;
      queryMyFriend.forEach((doc) => {
        let friendData = { id: doc.id, ...doc.data() };
        db.collection('friend_location').doc(friendData.location).onSnapshot((queryLocation) => {
          index += 1;
          if (queryLocation.exists) {
            const locData = queryLocation.data();
            friendData = { ...friendData, ...locData };
            myFriendsData.push(friendData);
          }
          if (index === sizeMyfriends) {
            this.props.setFriends(myFriendsData);
            // this.setState({
            //   myFriendsData,
            // });
          }
        });
      });
    });
  }

  handleAddFriend() {
    this.setState({
      ...this.state,
      add: true,
    });
  }

  handleAddClose() {
    this.setState({
      ...this.state,
      add: false,
    });
  }

  render() {
    return (
      <div className="home">
        <div className="add-friend">
          <RaisedButton
            label="Add New Friend"
            primary
            onClick={() => { this.handleAddFriend(); }}
          />
          <DialogFormFriend
            title="Add A Friend"
            open={this.state.add}
            close={() => { this.handleAddClose(); }}
            id={null}
            lastName={null}
            firstName={null}
            hobbies={null}
            age={null}
            country={null}
            state={null}
            city={null}
            locationId={null}
            lat={null}
            long={null}
          />
        </div>
        <div className="friends-container">
          {this.props.friends === null && (
            <span>
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
              <span className="sr-only">Loading Friends...</span>
            </span>
          )}
          {this.props.friends && this.props.friends.map(friend => (
            <MyFriend
              key={friend.id}
              id={friend.id}
              lastName={friend.last_name}
              firstName={friend.first_name}
              hobbies={friend.hobbies}
              age={friend.age}
              country={friend.country}
              state={friend.state}
              city={friend.city}
              locationId={friend.location}
              lat={friend.lat}
              long={friend.long}
            />
          ))}
        </div>
      </div>);
  }
}

Home.propTypes = {
  setFriends: PropTypes.func,
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

const mapDispatchToProps = dispatch => ({
  setFriends: (data) => { dispatch(setFriends(data)); },
});

export default pure(connect(mapStateToProps, mapDispatchToProps)(Home));
