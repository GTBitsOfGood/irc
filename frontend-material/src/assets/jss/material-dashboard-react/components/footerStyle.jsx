import {
  defaultFont,
  container,
  primaryColor
} from "assets/jss/material-dashboard-react.jsx";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
    textTransform: "uppercase",
    borderRadius: "0.1875rem",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "0.75rem"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "0.9375rem 0",
    margin: "0",
    fontSize: "0.875rem",
    float: "right!important"
  },
  footer: {
    bottom: "0",
    borderTop: "0.0625rem solid #e7e7e7",
    padding: "0.9375rem 0",
    ...defaultFont
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0rem",
    width: "auto"
  }
};
export default footerStyle;
