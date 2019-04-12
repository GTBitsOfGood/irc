/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Muted from "components/Typography/Muted.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


const users = [
  {
    username: "letmeintosmash",
    name: "Wario"
  },
  {
    username: "notscary",
    name: "Obunga"
  },
  {
    username: "iloveatari",
    name: "Pacman"
  }
];

class UserModify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      dispChangePermission: false,
      dispRemoveUser: false,
    };
    this.handleOnClickPermissionLevel = this.handleOnClickPermissionLevel.bind(this);
    this.handleOnClickRemoveUser = this.handleOnClickRemoveUser.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  handleOnClickPermissionLevel() {
      this.setState({
          dispChangePermission: true
      });
  }

  handleOnClickRemoveUser() {
      this.setState({
          dispRemoveUser: true
      });
  }

  handleNo() {
      this.setState({
        dispChangePermission: false,
        dispRemoveUser: false
      });
  }

  handleYes() {
      this.setState({
        dispChangePermission: false,
        dispRemoveUser: false
      });
  }

  render() {
    const { classes } = this.props;
    return (
        <div>
        {
            users.map(user => {
                return (
                    <Card>
                        <CardBody>
                            <h4>{user.name}</h4>
                            <Muted>
                                <h5><strong>Username </strong> {user.username}</h5>
                            </Muted>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={this.handleOnClickPermissionLevel} type="button" color="primary">Change Permission Level</Button>
                            <Dialog
                                open={this.state.dispChangePermission}
                                onClose={this.handleNo}
                            >
                                <DialogTitle>Change Permission Level</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Do you want to make this user an admin?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleYes} color="success">
                                        Yes
                                    </Button>
                                    <Button onClick={this.handleNo} color="danger">
                                        No
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Button onClick={this.handleOnClickRemoveUser} type="button" color="danger">Remove User</Button>
                                <Dialog
                                    open={this.state.dispRemoveUser}
                                    onClose={this.handleNo}
                                >
                                    <DialogTitle>Remove user</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Do you want to remove this user?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleYes} color='danger'>
                                            Yes
                                        </Button>
                                        <Button onClick={this.handleNo} color='primary'>
                                            No
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                        </CardFooter>
                    </Card>
                )
            })
        }
    </div>
    )
  }
}

export default withStyles(styles)(UserModify);
