import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import '../../assets/css/Login-Form-Clean.css';

@observer
class Login extends Component {
  @observable username = '';
  @observable password = '';

  render() {
    return (
      <div className="login-clean">
        <form method="post">
          <h2 className="sr-only">Login Form</h2>
          <div className="form-group">
            <input className="form-control" type="email" name="email" placeholder="Email" onChange={(e) => this.username = e.target.value }/>
          </div>
          <div className="form-group">
            <input className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => this.password = e.target.value} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">Log In</button>
          </div>
          <a href="#" className="forgot">Forgot your email or password?</a>
        </form>
      </div>
    );
  }
}

export default Login;
