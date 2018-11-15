import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div className="login-clean">
        <form method="post">
          <h2 className="sr-only">Register</h2>
          <div className="form-group">
            <input className="form-control" type="email" name="email" placeholder="Email" onChange={(e) => this.username = e.target.value }/>
          </div>
          <div className="form-group">
            <input className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => this.password = e.target.value} />
          </div>
          <div className="form-group">
            <span>
              <input className="form-control" type="radio" value="admin" />
              <label>Admin</label>
            </span>
            <span>
              <input className="form-control" type="radio" value="user" />
              <label>User</label>
            </span>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">Register User</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register;
