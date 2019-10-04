import React from "react";
import "assets/css/style.css";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import {Link} from "react-router-dom";
import {callBackendAPI} from "components/CallBackendApi";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Login extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <center>
        <Card id="login-container">
          <center>
            <CardHeader style={{ width: "70%" }} color="success">
              <h4><center>IRC Management System</center></h4>
            </CardHeader>
          </center>

          <CardBody style={{ padding: "15px 45px 45px 45px" }}>
            <div id="item-container">
              <CustomInput
                labelText="Email Address"
                formControlProps={{ fullWidth: true }}
              />
              <CustomInput
                id="maskedInput"
                labelText="Password"
                formControlProps={{ fullWidth: true }}
              />

              <div className="large-space-top">
                <Button color="success" onClick={ () => {this.login()} }>
                  Sign In
                </Button>
              </div>

              <div className="small-space-top">
                <span>Don't have an account? &nbsp;</span>
                <Link to="/signup" className="link">
                  Sign up here.
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </center>
    );
  }

  login() {

  }
}

export default withStyles(dashboardStyle)(Login);
