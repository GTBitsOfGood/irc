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

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      validity: [false, false]
    };
  }

  updateValidity(index, value) {
    let updated = this.state.validity;
    updated[index] = value;
    this.setState({ validity: updated });
  }

  checkEmail(e) {
    this.setState({ email: e.target.value }, () => {
      let regex = /^[a-zA-Z0-9][^\s]*$/;
      this.updateValidity(0, regex.test(this.state.email));
      this.setState({ emailError: false });

      if (this.state.passwordError) {
        this.updateValidity(1, true);
        this.setState({ passwordError: false });
      }
    });
  }

  checkPassword(e) {
    this.setState({ password: e.target.value }, () => {
      let regex = /^[a-zA-Z0-9][^\s]*$/;
      this.updateValidity(1, regex.test(this.state.password));
      this.setState({ passwordError: false });
    });
  }

  render() {
    return (
      <center>
        <form onSubmit={e => { e.preventDefault(); this.login(); }}>
          <Card id="login-container">
            <center>
              <CardHeader style={{ width: '70%' }} color="success">
                <h4><center>IRC Management System</center></h4>
              </CardHeader>
            </center>

            <CardBody style={{ padding: '15px 45px 45px 45px' }}>
              <div id="item-container">
                <CustomInput
                  labelText="Email Address"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{ onChange: (e) => { this.checkEmail(e); } }}
                  success={ this.state.validity[0] }
                  error={ !this.state.validity[0] }
                />
                { this.state.emailError &&
                  <span className="errorMessage">This email is not currently in use.</span>
                }
                <CustomInput
                  id="maskedInput"
                  labelText="Password"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{ onChange: (e) => { this.checkPassword(e); } }}
                  success={ this.state.validity[1] }
                  error={ !this.state.validity[1] }
                />
                { this.state.passwordError &&
                  <span className="errorMessage">Incorrect password. Try again.</span>
                }

                <div className="large-space-top">
                  <Button type="submit" color="success">
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
        </form>
      </center>
    );
  }

  login() {
    if (this.state.validity.every((index) => { return index; })) {
      callBackendAPI('/api/login', 'post', {
        email: this.state.email,
        password: this.state.password
      }).then(response => {
        if (response.error) {
          switch (response.error.substring(0, 9)) {
          case 'Error 404':
            this.setState({ emailError: true });
            this.updateValidity(0, false);
            break;
          case 'Error 400':
            this.setState({ passwordError: true });
            this.updateValidity(1, false);
            break;
          }
        } else {
          window.location.href = '/landing';
        }
      });
    }
  }
}

export default withStyles(dashboardStyle)(Login);
