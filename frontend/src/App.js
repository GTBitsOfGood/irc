import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { createBrowserHistory } from 'history';

import Login from './components/Login';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Route exact path="/" component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;
