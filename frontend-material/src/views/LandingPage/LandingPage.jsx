import React from "react";
import PropTypes from "prop-types";

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
      isNotLoggedIn: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.displayLogin = this.displayLogin.bind(this);
  }

  componentWillMount() {
    this.callBackendAPI('/api/verify').then(response => {
      console.log(response);
      if (response === "Error 401 - Unauthorized - No login token  provided") {
        this.setState({
          isNotLoggedIn: true
        });
      }
    });
  }



  handleClose() {
    this.setState({
      open: false
    });
  }

  handleLogin() {
    console.log("logging in");
  }

  callBackendAPI = async (route) => {
      const response = await fetch(route, {
        method: 'post'
      });
      const json = await response.json();
      console.log(json);
      if (json.error === "Error 401 - Unauthorized - No login token  provided") {
        return json.error;
      } else if (json.errorCode != 200) {
        this.setState({
          open: true,
          message: json.message
        });
      } else {
        return json.body;
      }
    };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
    <div>
      <GridItem xs={12} sm={12} md={12}>
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
                // variant="filled"
              />
              <TextField
                margin="normal"
                label="Password"
                // variant="filled"
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
              <Button style={{ width:"5rem", left:"1rem" }} color="success" round="true">Sign Up</Button>
              </CardBody>
          </Card>
          </center>
        }
      </div>
        <center>
        <Card style={{ width: "20rem" }}>
          <CardBody>
            <center>
              <Button color="danger">Log out</Button>
            </center>
          </CardBody>
        </Card>
        </center>
      </GridItem>
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
