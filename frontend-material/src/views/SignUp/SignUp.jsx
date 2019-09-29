import React from "react";
import "assets/css/style.css";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class SignUp extends React.Component {
  render() {
    return (
	    <div>
				<center>
					<Card id="main-container">
						<CardHeader style={{ width: "70%" }} color="success">
							<h4><center>Create an Account</center></h4>
						</CardHeader>

						<CardBody style={{ padding: "25px 45px 45px 45px" }}>
							<div id="item-container">
                <div id="name-container" className="left">
  								<CustomInput
  									labelText="First Name"
  									formControlProps={{ fullWidth: false }}
                    success
  								/>
                </div>
                <div id="name-container" className="right">
  								<CustomInput
  									labelText="Last Name"
  									formControlProps={{ fullWidth: false }}
                    success
  								/>
                </div>
								<CustomInput
									labelText="Email Address"
									formControlProps={{ fullWidth: true }}
									success
								/>
								<CustomInput
									id="maskedInput"
									labelText="Password"
									formControlProps={{ fullWidth: true }}
									error
								/>
								<CustomInput
									id="maskedInput"
									labelText="Confirm Password"
									formControlProps={{ fullWidth: true }}
									error
								/>

                <div className="large-space-top">
                  <Button color="success" round>Sign Up</Button>
                </div>

                <div className="small-space-top">
                  <span>Already have an account? &nbsp;</span>
                  <a href="../LandingPage/LandingPage.jsx" className="login">
                    Log in here.
                  </a>
                </div>
							</div>
						</CardBody>
					</Card>
				</center>
			</div>
    );
  }
}

export default withStyles(dashboardStyle)(SignUp);
