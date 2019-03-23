import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTable from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

//IRC added components
import Button from "components/CustomButtons/Button.jsx";
import Input from '@material-ui/core/Input';

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  //This function creates the table
  generateReport() {
    this.setState({
      isShown: true
    });
  }

  //This function should return the data for the table
  generateTableData() {
    return [
        [ "Dakota Rice" , "2" , "Computer" , "240" ] ,
        [ "Minerva Hooper" , "6" , "Driving" , "180" ] ,
        [ "Sage Rodriguez" , "20" , "IT Support" , "800" ] ,
    ];
  }

  //This function should return the headers for the table
  generateTableHead() {
    return ['Volunteer',' Hours','Job','Compensation'];
  }

  //This function should download a csv file to Users
  downloadCSV() {

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Items Donated</p>
                <h3 className={classes.cardTitle}>200</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Past Year
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Users</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Past Year
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Total Volunteer Hours</p>
                <h3 className={classes.cardTitle}>655</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Past Year
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem>
            <Button type="button" color="primary" onClick = {() => this.generateReport()}>
              Generate Report
            </Button>
          </GridItem>
          <GridItem>
            From: <Input type = "date"/>
          </GridItem>
          <GridItem>
            To: <Input type = "date"/>
          </GridItem>
        </GridContainer>

        {this.state.isShown &&
          <div>
            <Button type="button" color="info" onClick = {() => this.downloadCSV()}>
              Download CSV
            </Button>
            <CustomTable
            tableHeaderColor="primary"
            tableHead={this.generateTableHead()}
            tableData={this.generateTableData()}
            />
          </div>
        }

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
