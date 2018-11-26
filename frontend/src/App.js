import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react';

import AppHeader from './components/AppHeader';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Store from './components/Store';
import ShoppingCart from './components/ShoppingCart';

import Login from './components/Login';

const history = createBrowserHistory();

const Auth = (props) => (
  <div id="content">
    <Login store={props.store} />
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
      return <Main store={this.props.store}/>
    }
    return <Auth store={this.props.store.AuthModel} />;
  }
}

export default App;
