import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import PrivateRoute from './guards/PrivateRoute';

import Home from './components/misc/Home';
import Demo from './components/misc/demo';

// import Navbar from './components/misc/Navbar';
import UserProfile from './components/Users/UserProfile';

// import UserContext from './contexts/UserContext';


class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-12">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/users/:id/:securityCode" component={UserProfile} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/demo" component={Demo} />

            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
