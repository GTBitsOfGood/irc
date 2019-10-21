import React from 'react';
import 'assets/css/style.css';

import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';

import { Link } from 'react-router-dom';
import { callBackendAPI } from 'components/CallBackendApi';
import withStyles from '@material-ui/core/styles/withStyles';
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmation: '',
      emailInUse: false,
      validity: [false, false, false, false, false]
    };
  }

  updateValidity(index, value) {
    let updated = this.state.validity;
    updated[index] = value;
    this.setState({ validity: updated });
  }

  fnameCheck(e) {
    this.setState({ fname: e.target.value }, () => {
      let regex = /^[a-zA-Z0-9][^\s]*$/;
      this.updateValidity(0, regex.test(this.state.fname));
    });
  }

  lnameCheck(e) {
    this.setState({ lname: e.target.value }, () => {
      let regex = /^[a-zA-Z0-9][^\s]*$/;
      this.updateValidity(1, regex.test(this.state.lname));
    });
  }

  emailCheck(e) {
    this.setState({ email: e.target.value }, () => {
      let regex = /^([a-zA-Z0-9\.]+)@([a-zA-Z0-9\.]+)\.([a-zA-Z]{2,3})$/;
      this.updateValidity(2, regex.test(this.state.email));
      this.setState({ emailInUse: false });
    });
  }

  passwordCheck(e) {
    this.setState({ password: e.target.value }, () => {
      let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#?!@$%^&*]{8,}$/;
      this.updateValidity(3, regex.test(this.state.password));
      this.confirmCheck(this.state.confirmation);
    });
  }

  confirmCheck(e) {
    if (e.target) {
      this.setState({ confirmation: e.target.value }, () => {
        let validPass = this.state.validity[3];
        let sameValue = this.state.confirmation === this.state.password;
        this.updateValidity(4, validPass && sameValue);
      });
    } else {
      let validPass = this.state.validity[3];
      let sameValue = e === this.state.password;
      this.updateValidity(4, validPass && sameValue);
    }
  }

  render() {
    return (
      <center>
        <form onSubmit={e => { e.preventDefault(); this.signup(); }}>
          <Card id="signup-container">
            <center>
              <CardHeader style={{ width: '70%' }} color="success">
                <h4><center>Create an Account</center></h4>
              </CardHeader>
            </center>

            <CardBody style={{ padding: '15px 45px 45px 45px' }}>
              <div id="item-container">
                <div id="name-container" className="left">
                  <CustomInput
                    labelText="First Name"
                    formControlProps={{ fullWidth: false }}
                    inputProps={{ onChange: (e) => { this.fnameCheck(e); } }}
                    success={ this.state.validity[0] }
                    error={ !this.state.validity[0] }
                  />
                </div>
                <div id="name-container" className="right">
                  <CustomInput
                    labelText="Last Name"
                    formControlProps={{ fullWidth: false }}
                    inputProps={{ onChange: (e) => { this.lnameCheck(e); } }}
                    success={ this.state.validity[1] }
                    error={ !this.state.validity[1] }
                  />
                </div>
                <CustomInput
                  labelText="Email Address"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{ onChange: (e) => { this.emailCheck(e); } }}
                  success={ this.state.validity[2] }
                  error={ !this.state.validity[2] }
                />
                { this.state.emailInUse &&
                  <span className="errorMessage">This email is already in use.</span>
                }
                <CustomInput
                  id="maskedInput"
                  labelText="Password"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    onChange: (e) => { this.passwordCheck(e); },
                    type: "password"
                  }}
                  success={ this.state.validity[3] }
                  error={ !this.state.validity[3] }
                />
                <CustomInput
                  id="maskedInput"
                  labelText="Confirm Password"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    onChange: (e) => { this.confirmCheck(e); },
                    type: "password"
                  }}
                  success={ this.state.validity[4] }
                  error={ !this.state.validity[4] }
                />

                <div className="large-space-top">
                  <Button type="submit" color="success">
                    Sign Up
                  </Button>
                </div>

                <div className="small-space-top">
                  <span>Already have an account? &nbsp;</span>
                  <Link to="/login" className="link">
                    Log in here.
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </form>
      </center>
    );
  }

  signup() {
    if (this.state.validity.every(index => { return index; })) {
      callBackendAPI('/api/signup', 'post', {
        firstName: this.state.fname,
        lastName: this.state.lname,
        email: this.state.email,
        password: this.state.password
      }).then(response => {
        if (response.error != null) {
          this.setState({ emailInUse: true });
          this.updateValidity(2, false);
        } else {
          callBackendAPI('/api/login', 'post', {
            email: this.state.email,
            password: this.state.password
          }).then(() => {
            window.location.href = '/landing';
          });
        }
      });
    }
  }
}

export default withStyles(dashboardStyle)(SignUp);
