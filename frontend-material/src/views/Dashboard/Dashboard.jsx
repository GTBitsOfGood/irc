import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTable from "components/Table/Table.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

//IRC added components
import Button from "components/CustomButtons/Button.jsx";
import Input from '@material-ui/core/Input';
import {callBackendAPI} from "components/CallBackendApi";


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0,
    shopCount: 0,
    userCount: 0,
    volCount: 0,
    from: "",
    to: "",
    table: []
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentWillMount() {
    callBackendAPI('/api/transactions/getStats', 'get').then(response => {
      this.setState({
        shopCount: response.shopCount,
        userCount: response.userCount,
        volCount: response.volunteerCount
      })
    })
  }

  //This function creates the table
  generateReport() {
    callBackendAPI('/api/transactions/getTransaction?transactionType=VOLUNTEER&startDate='+this.state.from+'&endDate='+this.state.to, 'get').then(response => {
      for (var i = 0; i < response.length; i++) {
        for (var j = 0; j < response[i].volunteerItems.length; j++) {
          let table = this.state.table.slice();
          table.push([response[i].volunteerItems[j].item.name, response[i].volunteerItems[j].count, response[i].clientId, response[i].volunteerItems[j].item.price*response[i].volunteerItems[j].count]);
          this.setState({
            table: table
          })
        }
      }
      console.log(this.state.table);
      this.setState({
        isShown: true
      })
    });
  }

  //This function should return the data for the table
  generateTableData() {
    console.log(this.state.table);
    return this.state.table;
  }

  //This function should return the headers for the table
  generateTableHead() {
    return ['Item', 'Count', 'ClientId', 'Total Price'];
  }

  //This function should download a csv file to Users
  downloadCSV() {

  }

  handleFromChange(event) {
    this.setState({
      from: event.target.value
    })
  }

  handleToChange(event) {
    this.setState({
      to: event.target.value
    })
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
                <p className={classes.cardCategory}>Total Shop Transactions</p>
                <h3 className={classes.cardTitle}>{this.state.shopCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  All Time
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
                <h3 className={classes.cardTitle}>{this.state.userCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  All Time
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
                <p className={classes.cardCategory}>Total Volunteer Transactions</p>
                <h3 className={classes.cardTitle}>{this.state.volCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  All Time
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
            From: <Input onChange = {(e) => this.handleFromChange(e)} type = "date"/>
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
