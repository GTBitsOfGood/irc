import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {callBackendAPI} from "components/CallBackendApi";
import ErrorDialog from "components/ErrorDialog";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "0.875rem",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0rem",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0.1875rem",
    textDecoration: "none"
  }
};



class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirm: "",
      open: false
    }

    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  handleConfirmChange = event => {
    this.setState({ confirm: event.target.value });
  }

  handleResetPassword() {
    if (this.state.password === this.state.confirm) {
      callBackendAPI('/api/changePassword', 'post', {
        password: this.state.password
      }).then(response => {
        if (response) {console.log(response);}
      })
    } else {
      this.setState({
        open: true
      });
    }
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Edit Profile</h4>
                <p>Update password here</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="New password"
                      id="first-name"
                      inputProps={{
                        onChange:(e) => this.handlePasswordChange(e),
                        type: "password"
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Confirm"
                      id="last-name"
                      inputProps={{
                        onChange:(e) => this.handleConfirmChange(e),
                        type: "password"
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={() => this.handleResetPassword()} color="primary">Reset Password</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <ErrorDialog
            open = {this.state.open}
            handleClose = {this.handleClose}
            message = {"Your passwords don't match!"}
          />
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
