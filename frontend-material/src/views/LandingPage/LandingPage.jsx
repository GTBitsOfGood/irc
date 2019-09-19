import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {callBackendAPI} from "components/CallBackendApi";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import TextField from '@material-ui/core/TextField';

import ErrorDialog from "components/ErrorDialog";


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class LandingPage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      open: false,
      message: "",
      isNotLoggedIn: false,
      username: "",
      password: "",
      redirect: false
    }
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    callBackendAPI('/api/verify', 'post', {}).then(response => {
      if (response.error === "Error 401 - Unauthorized - No login token  provided") {
        this.setState({
          isNotLoggedIn: true
        });
      } else {
        this.setState({
          username: response.user.email
        })
      }
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleLogin() {
    callBackendAPI('/api/login','post', {
      email: this.state.username,
      password: this.state.password
    }).then(response => {
      if (response.error != null) {
        this.setState({
          open: true,
          message: response.message
        });
      } else {
        this.setState({
          redirect: response.urlRedirect
        })
      }
    })
  }

  handleSignup() {
    callBackendAPI('/api/signup', 'post', {
      email: this.state.username,
      password: this.state.password
    }).then(response => {
      if (response.error != null) {
        this.setState({
          open: true,
          message: response.message
        });
      } else {
        this.setState({
          redirect: response.urlRedirect
        })
      }
    })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect !== false) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        {!this.state.isNotLoggedIn &&
          <center>
            <Card style={{ width: "60%" }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}><center> Welcome, {this.state.username} </center></h4>
              </CardHeader>
              <CardBody>
                <p> Please select an action on the left or log out below. </p>
              </CardBody>
            </Card>
          </center>
        }
        <div>
          {this.state.isNotLoggedIn &&
            <center>
            <Card style={{ width: "20rem" }}>
              <CardBody>
                <CardHeader style={{ width: "10rem", bottom:"1rem" }} color="info">
                  <h4><center> Login/Signup </center></h4>
                </CardHeader>
                <TextField
                  label="Username"
                  margin="normal"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <TextField
                  margin="normal"
                  label="Password"
                  inputProps={{type: "password"}}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </CardBody>
              <CardBody>
                <Button
                  style={{ width: "5rem", right:"1rem" }}
                  color="success"
                  round={true}
                  onClick={() => this.handleLogin()}
                >
                  Login
                </Button>
                <Button
                  style={{ width:"5rem", left:"1rem" }}
                  color="success"
                  round={true}
                  onClick={() => this.handleSignup()}
                >
                  Sign Up
                </Button>
              </CardBody>
            </Card>
            </center>
          }
        </div>
        {!this.state.isNotLoggedIn &&
          <center>
          <Card style={{ width: "20rem" }}>
            <CardBody>
              <center>
                <Button color="danger"> Log out </Button>
              </center>
            </CardBody>
          </Card>
          </center>
        }
        <ErrorDialog
          open = {this.state.open}
          handleClose = {this.handleClose}
          message = {this.state.message}
        />
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(LandingPage);
