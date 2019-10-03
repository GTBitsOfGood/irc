import {
  defaultFont,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow
} from "assets/jss/material-dashboard-react.jsx";

const snackbarContentStyle = {
  root: {
    ...defaultFont,
    flexWrap: "unset",
    position: "relative",
    padding: "1.25rem 0.9375rem",
    lineHeight: "1.25rem",
    marginBottom: "1.25rem",
    fontSize: "0.875rem",
    backgroundColor: "white",
    color: "#555555",
    borderRadius: "0.1875rem",
    boxShadow:
      "0 0.75rem 1.25rem -0.625rem rgba(255, 255, 255, 0.28), 0 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.12), 0 0.4375rem 0.5rem -0.3125rem rgba(255, 255, 255, 0.2)"
  },
  top20: {
    top: "1.25rem"
  },
  top40: {
    top: "2.5rem"
  },
  info: {
    backgroundColor: "#00d3ee",
    color: "#ffffff",
    ...infoBoxShadow
  },
  success: {
    backgroundColor: "#5cb860",
    color: "#ffffff",
    ...successBoxShadow
  },
  warning: {
    backgroundColor: "#ffa21a",
    color: "#ffffff",
    ...warningBoxShadow
  },
  danger: {
    backgroundColor: "#f55a4e",
    color: "#ffffff",
    ...dangerBoxShadow
  },
  primary: {
    backgroundColor: "#af2cc5",
    color: "#ffffff",
    ...primaryBoxShadow
  },
  rose: {
    backgroundColor: "#eb3573",
    color: "#ffffff",
    ...roseBoxShadow
  },
  message: {
    padding: "0",
    display: "block",
    maxWidth: "89%"
  },
  close: {
    width: "0.6875rem",
    height: "0.6875rem"
  },
  iconButton: {
    width: "1.5rem",
    height: "1.5rem",
    padding: "0rem"
  },
  icon: {
    display: "block",
    left: "0.9375rem",
    position: "absolute",
    top: "50%",
    marginTop: "-0.9375rem",
    width: "1.875rem",
    height: "1.875rem"
  },
  infoIcon: {
    color: "#00d3ee"
  },
  successIcon: {
    color: "#5cb860"
  },
  warningIcon: {
    color: "#ffa21a"
  },
  dangerIcon: {
    color: "#f55a4e"
  },
  primaryIcon: {
    color: "#af2cc5"
  },
  roseIcon: {
    color: "#eb3573"
  },
  iconMessage: {
    paddingLeft: "3.125rem",
    display: "block"
  }
};

export default snackbarContentStyle;
