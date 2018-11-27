import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminDashboard extends Component {
  render() {
    return (
      <div id="dashboard">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="button">
                <Link to="/store" className="btn btn-primary">Shop</Link>
              </div>
              <div className="button">
                <Link to="/register" className="btn btn-primary">Register</Link>
              </div>
              <div className="button">
                <button className="btn btn-primary">Change Profile</button>
              </div>
              <div className="button">
                <Link to="/volunteer" className="btn btn-primary">Add Volunteer Time</Link>
              </div>
            </div>
            <div className="col">
              <div className="button">
                <button className="btn btn-primary">Add Users</button>
              </div>
              <div className="button">
                <button className="btn btn-primary">Generate Reports</button>
              </div>
              <div className="button">
                <button className="btn btn-primary">Modify Inventory/Time</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class UserDashboard extends Component {
  render() {
    return (
      <div id="dashboard">
        <div className="container">
          <div className="button">
            <button className="btn btn-primary">Add Users</button>
          </div>
          <div className="button">
            <button className="btn btn-primary">Generate Reports</button>
          </div>
          <div className="button">
            <button className="btn btn-primary">Modify Inventory/Time</button>
          </div>
        </div>
      </div>
    );
  }
}

class Dashboard extends Component {
  render() {
    // if (this.props.store.user === admin) {
    //   return <AdminDashboard />
    // } else {
    //   return <UserDashboard />
    // }
    return <AdminDashboard />
  }
}

export default Dashboard;
