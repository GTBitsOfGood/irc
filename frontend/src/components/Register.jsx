import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: ''
    };
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister() {
    this.props.store.RegisterModel.register(this.state.email, this.state.password, this.state.status);
  }

  render() {
    return (
      <div className="login-clean">
        <form>
          <h2 className="sr-only">Register</h2>
          <div className="form-group">
            <input className="form-control" type="email" name="email" placeholder="Email" onChange={(e) => {
              this.setState({ email: e.target.value})
            }} />
          </div>
          <div className="form-group">
            <input className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => {
              this.setState({password: e.target.value})
            }} />
          </div>
          <div className="form-group">
            <span>
              <input name="status" className="form-control" type="radio" value="admin" onChange={(e) => {
                this.setState({status: e.target.value})
              }}/>
              <label>Admin</label>
            </span>
            <span>
              <input name="status" className="form-control" type="radio" value="user" onChange={(e) => {
                this.setState({status: e.target.value})
              }} />
              <label>User</label>
            </span>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={this.onRegister}>Register User</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register;
