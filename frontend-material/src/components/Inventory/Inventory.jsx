import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function CustomInventory({ ...props }) {
  const { classes, headColor, itemData } = props;
  return (
    <Card>
      <CardHeader color="warning" stats icon>
        <h3 {props.itemName}</h3>
      </CardHeader>
      <CardFooter>
        <div className={classes.stats}>
          <Danger>
            <Warning />
          </Danger>
          <a href="#pablo" onClick={e => e.preventDefault()}>
            Get more space
          </a>
        </div>
      </CardFooter>
    </Card>
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            {itemData.map((prop, key) => {
            return (
              <Card>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </Card>
            );
          })}
          </GridItem>
        </GridContainer>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default withStyles(tableStyle)(CustomInventory);
