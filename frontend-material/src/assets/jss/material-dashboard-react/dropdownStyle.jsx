import {
  primaryColor,
  primaryBoxShadow,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

const dropdownStyle = theme => ({
  buttonLink: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      marginLeft: "1.875rem",
      width: "auto"
    }
  },
  links: {
    width: "1.25rem",
    height: "1.25rem",
    zIndex: "4",
    [theme.breakpoints.down("md")]: {
      display: "block",
      width: "1.875rem",
      height: "1.875rem",
      color: "#a9afbb",
      marginRight: "0.9375rem"
    }
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "0.875rem"
  },
  popperClose: {
    pointerEvents: "none"
  },
  pooperResponsive: {
    [theme.breakpoints.down("md")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "auto",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      WebkitBoxShadow: "none",
      boxShadow: "none",
      color: "black"
    }
  },
  pooperNav: {
    [theme.breakpoints.down("sm")]: {
      position: "static !important",
      left: "unset !important",
      top: "unset !important",
      transform: "none !important",
      willChange: "none !important",
      "& > div": {
        boxShadow: "none !important",
        marginLeft: "0rem",
        marginRight: "0rem",
        transition: "none !important",
        marginTop: "0rem !important",
        marginBottom: "0rem !important",
        padding: "0rem !important",
        backgroundColor: "transparent !important",
        "& ul li": {
          color: "#FFF !important",
          margin: "0.625rem 0.9375rem 0!important",
          padding: "0.625rem 0.9375rem !important",
          "&:hover": {
            backgroundColor: "hsla(0,0%,78%,.2)",
            boxShadow: "none"
          }
        }
      }
    }
  },
  dropdown: {
    borderRadius: "0.1875rem",
    border: "0",
    boxShadow: "0 0.125rem 0.3125rem 0 rgba(0, 0, 0, 0.26)",
    top: "100%",
    zIndex: "1000",
    minWidth: "10rem",
    padding: "0.3125rem 0",
    margin: "0.125rem 0 0",
    fontSize: "0.875rem",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: "#fff",
    WebkitBackgroundClip: "padding-box",
    backgroundClip: "padding-box"
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: "0.8125rem",
    padding: "0.625rem 1.25rem",
    margin: "0 0.3125rem",
    borderRadius: "0.125rem",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: "#333",
    whiteSpace: "nowrap",
    height: "unset",
    "&:hover": {
      backgroundColor: primaryColor,
      color: "#FFFFFF",
      ...primaryBoxShadow
    }
  }
});

export default dropdownStyle;
