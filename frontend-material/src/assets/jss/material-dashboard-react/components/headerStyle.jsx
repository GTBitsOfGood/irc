import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";

const headerStyle = theme => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "0.625rem",
    zIndex: "1029",
    color: "#555555",
    border: "0",
    borderRadius: "0.1875rem",
    padding: "0.625rem 0",
    transition: "all 150ms ease 0s",
    minHeight: "3.125rem",
    display: "block"
  },
  container: {
    ...container,
    minHeight: "3.125rem"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "1.875rem",
    fontSize: "1.125rem",
    borderRadius: "0.1875rem",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  appResponsive: {
    top: "0.5rem"
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  }
});

export default headerStyle;
