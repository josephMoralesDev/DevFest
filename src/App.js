import React, { PureComponent } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  AppBar,
  Tabs,
  Tab,
} from 'material-ui';
import Home from './views/home';
import Location from './views/location';

import './App.css';
/* eslint-disable react/no-array-index-key */


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuSelected: 0,
    };
  }

  changeMenu(val) {
    this.setState({
      ...this.state,
      menuSelected: val,
    });
  }


  render() {
    const myMenu = (
      <Tabs onChange={(value) => { this.changeMenu(value); }} value={this.state.menuSelected}>
        <Tab value={0} label="My Friends" containerElement={<Link to="/" href="/" />} />
        <Tab value={1} label="Friend's Location" containerElement={<Link to="/location" href="/location" />} />
      </Tabs>
    );
    return (
      <MuiThemeProvider>
        <AppBar title={myMenu} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/location" component={Location} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
