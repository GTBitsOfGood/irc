import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {callBackendAPI} from "components/CallBackendApi";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import {Link} from "react-router-dom";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import TextField from '@material-ui/core/TextField';

import "assets/css/style.css";


class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      value: 0,
      open: false,
      message: "​",
      isNotLoggedIn: false,
      username: "",
      password: "",
      redirect: false
    }
    this.handleClose = this.handleClose.bind(this);
  }


  handleLogin() {
    callBackendAPI('/api/login','post', {
      email: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log(response);
      if (response.error != null || response.message == "Missing credentials") {
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

  handleClose() {
    this.setState({
      open: false
    });
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
      console.log("ji");
      return <Redirect to={this.state.redirect} />
    }

    return(
      <center>
        <form onSubmit={e => { e.preventDefault(); this.handleLogin(); }}>
          <Card style={{ width: "500px"}}>
          <center>
            <CardHeader style={{ width: "70%" }} color="success">
              <h4><center>IRC Inventory System</center></h4>
            </CardHeader>
          </center>
            <CardBody >
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
              <p style={{color: 'red'}}>
                {this.state.message}
              </p>
              <div className="small-space-top">
                <Button
                  style={{ width: "20%"}}
                  color="success"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
              <div className="small-space-top">
                <p style={{marginBottom: 10}}>
                  No account? <Link to="/signup" className="makeAccount">  Make an account </Link>
                </p>
                <a className="makeAccount">
                  Forgot password
                </a>
              </div>
            </CardBody>
          </Card>
          </form>
      </center>
    )

  }



}

export default withStyles(dashboardStyle)(Login);
