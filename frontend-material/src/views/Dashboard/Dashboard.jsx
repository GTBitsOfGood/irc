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

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0,
    shopCount: 0,
    userCount: 0,
    volCount: 0,
    from: "",
    to: "",
    table: [],
    type: "SHOP",
    clients: []
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleTypeChange = event => {
    this.setState({ type: event.target.value });
  };

  componentWillMount() {
    callBackendAPI('/api/transactions/getStats', 'get').then(response => {
      this.setState({
        shopCount: response.shopCount,
        userCount: response.userCount,
        volCount: response.volunteerCount
      })
    })
    callBackendAPI('/api/getAllClients', 'get').then(response => {
      this.setState({
        clients: response
      })
      console.log(this.state.clients);
    });
  }

  //This function creates the table
  generateReport() {
    callBackendAPI('/api/transactions/getTransaction?transactionType='+this.state.type+'&startDate='+this.state.from+'&endDate='+this.state.to, 'get').then(response => {
      if (this.state.type === "VOLUNTEER") {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < response[i].volunteerItems.length; j++) {
            let table = this.state.table.slice();
            let k = 0;
            let searching = true;
            let alienNumber = 0;
            while (k < this.state.clients.length && searching) {
              if (this.state.clients[k]._id === response[i].clientId) {
                alienNumber = this.state.clients[k].alienNumber;
                searching = false;
              }
              k++;
            }
            table.push([response[i].volunteerItems[j].item.name, response[i].volunteerItems[j].count, alienNumber, response[i].volunteerItems[j].item.price*response[i].volunteerItems[j].count]);
            this.setState({
              table: table
            })
          }
        }
      } else {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < response[i].shopItems.length; j++) {
            let table = this.state.table.slice();
            let k = 0;
            let searching = true;
            let alienNumber = 0;
            while (k < this.state.clients.length && searching) {
              if (this.state.clients[k]._id === response[i].clientId) {
                alienNumber = this.state.clients[k].alienNumber;
                searching = false;
              }
              k++;
            }
            table.push([response[i].shopItems[j].item.name, response[i].shopItems[j].count, alienNumber, response[i].shopItems[j].item.price*response[i].shopItems[j].count]);
            this.setState({
              table: table
            })
          }
        }
      }
      this.setState({
        isShown: true
      })
    });
  }

  //Return the data for the table
  generateTableData() {
    console.log(this.state.table);
    return this.state.table;
  }

  //Return the headers for the table
  generateTableHead() {
    return ['Item', 'Count', 'ClientId', 'Total Price'];
  }

  //Download a csv file to Users
  print() {
    let divToPrint = document.getElementsByClassName('outer')[0];
    console.log(divToPrint);
    divToPrint.childNodes[0].removeChild(divToPrint.childNodes[0].childNodes[0]);
    let newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
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
        <div>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="Type"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                >
                    <FormControlLabel value="SHOP" control={<Radio />} label="Shop" />
                    <FormControlLabel value="VOLUNTEER" control={<Radio />} label="Volunteer" />

                </RadioGroup>
            </FormControl>
        </div>

        <div className="outer">
        {this.state.isShown &&
          <div className="outerTable">
            <Button type="button" color="info" onClick = {() => this.print()}>
              Print
            </Button>
            <CustomTable
            className = "printableTable"
            tableHeaderColor="primary"
            tableHead={this.generateTableHead()}
            tableData={this.generateTableData()}
            />
          </div>
        }
        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
