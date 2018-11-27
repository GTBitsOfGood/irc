import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppHeader from './components/AppHeader';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Store from './components/Store';
import ShoppingCart from './components/ShoppingCart';
import VolunteerTime from './components/VolunteerTime';

import Login from './components/Login';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter history={history}>
          <div id="content">
            <AppHeader />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/dashboard" component={() => <Dashboard store={this.props.store} />} />
              <Route path="/register" component={() => <Register store={this.props.store} />} />
              <Route path="/cart" component={() => <ShoppingCart store={this.props.store} />} />
              <Route path="/store" component={() => <Store store={this.props.store} />} />
              <Route path="/volunteer" component={() => <VolunteerTime store={this.props.store} />} />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
