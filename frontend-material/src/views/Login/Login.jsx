import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {callBackendAPI} from "components/CallBackendApi";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import TextField from '@material-ui/core/TextField';

class Login extends React.Component {

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

  render() {
    const { classes } = this.props;
    if (this.state.redirect !== false) {
      return <Redirect to={this.state.redirect} />
    }

    return(
      <center>
      <Card style={{ width: "30%"}}>
        <CardBody >
          <h1>
            IRC System
            <img src="/static/media/ircsquare.c537e70b.png" alt="logo" style={{height: 35, width: 35, marginLeft:5}}/>
          </h1>
          <TextField
            label="Username"
            style={{marginTop: "20px", width: "40%"}}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <br/>
          <TextField
            label="Password"
            inputProps={{type: "password"}}
            style={{marginTop: "20px", width: "40%"}}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </CardBody>
        <CardBody>
          <Button
            style={{ width: "20%"}}
            color="success"
          >
            Sign In
          </Button>
          <br/>
          <br/>
          <p style={{marginBottom: 10}}>
            No account? <a> Make an account </a>
          </p>
          <a>
            Forgot password
          </a>
        </CardBody>
      </Card>
      </center>
    )

  }



}

export default withStyles(dashboardStyle)(Login);
