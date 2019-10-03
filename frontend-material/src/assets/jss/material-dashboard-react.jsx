/*!

 =========================================================
 * Material Dashboard React - v1.5.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 260;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const container = {
  paddingRight: "0.9375rem",
  paddingLeft: "0.9375rem",
  marginRight: "auto",
  marginLeft: "auto"
};

const boxShadow = {
  boxShadow:
    "0 0.625rem 1.875rem -0.75rem rgba(0, 0, 0, 0.42), 0 0.25rem 1.5625rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.2)"
};

const card = {
  display: "inline-block",
  position: "relative",
  width: "100%",
  margin: "1.5625rem 0",
  boxShadow: "0 0.0625rem 0.25rem 0 rgba(0, 0, 0, 0.14)",
  borderRadius: "0.1875rem",
  color: "rgba(0, 0, 0, 0.87)",
  background: "#fff"
};

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

const primaryColor = "#9c27b0";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const infoColor = "#00acc1";
const roseColor = "#e91e63";
const grayColor = "#999999";

const primaryBoxShadow = {
  boxShadow:
    "0 0.75rem 1.25rem -0.625rem rgba(156, 39, 176, 0.28), 0 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.12), 0 0.4375rem 0.5rem -0.3125rem rgba(156, 39, 176, 0.2)"
};
const infoBoxShadow = {
  boxShadow:
    "0 0.75rem 1.25rem -0.625rem rgba(0, 188, 212, 0.28), 0 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.12), 0 0.4375rem 0.5rem -0.3125rem rgba(0, 188, 212, 0.2)"
};
const successBoxShadow = {
  boxShadow:
    "0 0.75rem 1.25rem -0.625rem rgba(76, 175, 80, 0.28), 0 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.12), 0 0.4375rem 0.5rem -0.3125rem rgba(76, 175, 80, 0.2)"
};
const warningBoxShadow = {
  boxShadow:
    "0 0.75rem 1.25rem -0.625rem rgba(255, 152, 0, 0.28), 0 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.12), 0 0.4375rem 0.5rem -0.3125rem rgba(255, 152, 0, 0.2)"
};
const dangerBoxShadow = {
  boxShadow:
    "0 0.75rem 1.25rem -0.625rem rgba(244, 67, 54, 0.28), 0 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.12), 0 0.4375rem 0.5rem -0.3125rem rgba(244, 67, 54, 0.2)"
};
const roseBoxShadow = {
  boxShadow:
    "0 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0 0.4375rem 0.625rem -0.3125rem rgba(233, 30, 99, 0.4)"
};

const warningCardHeader = {
  background: "linear-gradient(60deg, #ffa726, #fb8c00)",
  ...warningBoxShadow
};
const successCardHeader = {
  background: "linear-gradient(60deg, #66bb6a, #43a047)",
  ...successBoxShadow
};
const dangerCardHeader = {
  background: "linear-gradient(60deg, #ef5350, #e53935)",
  ...dangerBoxShadow
};
const infoCardHeader = {
  background: "linear-gradient(60deg, #26c6da, #00acc1)",
  ...infoBoxShadow
};
const primaryCardHeader = {
  background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
  ...primaryBoxShadow
};
const roseCardHeader = {
  background: "linear-gradient(60deg, #ec407a, #d81b60)",
  ...roseBoxShadow
};

const cardActions = {
  margin: "0 1.25rem 0.625rem",
  paddingTop: "0.625rem",
  borderTop: "0.0625rem solid #eeeeee",
  height: "auto",
  ...defaultFont
};

const cardHeader = {
  margin: "-1.25rem 0.9375rem 0",
  borderRadius: "0.1875rem",
  padding: "0.9375rem"
};

const defaultBoxShadow = {
  border: "0",
  borderRadius: "0.1875rem",
  boxShadow:
    "0 0.625rem 1.25rem -0.75rem rgba(0, 0, 0, 0.42), 0 0.1875rem 1.25rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.2)",
  padding: "0.625rem 0",
  transition: "all 150ms ease 0s"
};

const title = {
  color: "#3C4858",
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "1.875rem",
  marginBottom: "1.5625rem",
  minHeight: "2rem",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: "#777",
    fontWeight: "400",
    lineHeight: "1"
  }
};

const cardTitle = {
  ...title,
  marginTop: "0",
  marginBottom: "0.1875rem",
  minHeight: "auto",
  "& a": {
    ...title,
    marginTop: "0.625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const cardSubtitle = {
  marginTop: "-0.375rem"
};

const cardLink = {
  "& + $cardLink": {
    marginLeft: "1.25rem"
  }
};

export {
  //variables
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  cardSubtitle,
  cardLink
};
