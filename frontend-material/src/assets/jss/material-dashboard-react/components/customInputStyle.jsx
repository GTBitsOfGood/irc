import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

const customInputStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "0.0625rem !important"
    },
    "&:after": {
      borderColor: primaryColor
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.42857"
  },
  labelRootError: {
    color: dangerColor
  },
  labelRootSuccess: {
    color: successColor
  },
  feedback: {
    position: "absolute",
    top: "1.125rem",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "1.5rem",
    height: "1.5rem",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "1rem"
  },
  formControl: {
    margin: "0.9375rem 0 0 0",
    position: "relative"
  }
};

export default customInputStyle;
