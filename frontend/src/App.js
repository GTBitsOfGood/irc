import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react';

import AppHeader from './components/AppHeader';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import DisplayReports from './components/DisplayReports';
import Store from './components/Store';
import ShoppingCart from './components/ShoppingCart';
import VolunteerTime from './components/VolunteerTime';

import Signup from './components/Signup';
import Login from './components/Login';

const history = createBrowserHistory();

const SignupPage = (props) => (
    <div id = "content">
        <Signup store = {props.store.SignupModel} />
    </div>
);

const Auth = (props) => (
  <div id="content">
    <Login store = {props.store.AuthModel} signup = {props.store.SignupModel} />
  </div>
);



const Main = (props) => (
  <div>
    <HashRouter history={history}>
      <div id="content">
        <AppHeader />
        <Switch>
          <Route path="/dashboard" component={() => <Dashboard store={this.props.store} />} />
          <Route path="/register" component={() => <Register store={this.props.store} />} />
          <Route path="/cart" component={() => <ShoppingCart store={props.store} />} />
          <Route path="/store" component={() => <Store store={props.store} />} />
        </Switch>
      </div>
    </HashRouter>
  </div>
);

@observer
class App extends Component {
  render() {
    if (this.props.store.AuthModel.user) {
      return <Main store={this.props.store} />
  } else if (this.props.store.SignupModel.onSignup) {
      return <SignupPage store = {this.props.store} />
  }
    return <Auth store={this.props.store} />
  }
}

export default App;
