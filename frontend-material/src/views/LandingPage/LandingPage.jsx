import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {callBackendAPI} from "components/CallBackendApi";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";


import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import TextField from '@material-ui/core/TextField';

import ErrorDialog from "components/ErrorDialog";


import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class LandingPage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      username: "test_user1",
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
    if (this.state.redirect != false) {
      return <Redirect to={this.state.redirect} />
    }

    return (
    <div>
    {!this.state.isNotLoggedIn &&
      <center>
        <Card style={{ width: "60%" }}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}> <center> Welcome, {this.state.username} </center></h4>
          </CardHeader>
          <CardBody>
            <p> You are successfully authorized to use the VADR System. Please select an action on the left or logout below. </p>
          </CardBody>
        </Card>
      </center>
    }
      <div>
        {this.state.isNotLoggedIn &&
          <center>
          <Card style={{ width: "20rem" }}>
            <CardBody >
              <CardHeader style={{ width: "10rem", bottom:"1rem" }} color="info">
                <h4> <center> Login/Signup </center></h4>
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
                onClick = {() => this.handleLogin()}
                round = {true}
              >
                Login
              </Button>
              <Button
                style={{ width:"5rem", left:"1rem" }}
                color="success"
                round="true"
                onClick = {() => this.handleSignup()}
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
              <Button color="danger">Log out</Button>
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
