import {
  defaultFont,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.jsx";

const headerLinksStyle = theme => ({
  ...dropdownStyle(theme),
  search: {
    "& > div": {
      marginTop: "0"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0.625rem 0.9375rem !important",
      float: "none !important",
      paddingTop: "0.0625rem",
      paddingBottom: "0.0625rem",
      padding: "0!important",
      width: "60%",
      marginTop: "2.5rem",
      "& input": {
        color: "#FFFFFF"
      }
    }
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "0.875rem",
    margin: "0rem"
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "0.625rem 0.9375rem 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "1.5rem",
        height: "1.875rem",
        marginRight: "0.9375rem",
        marginLeft: "-0.9375rem"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "1.5rem",
        lineHeight: "1.875rem",
        width: "1.5rem",
        height: "1.875rem",
        marginRight: "0.9375rem",
        marginLeft: "-0.9375rem"
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%"
      }
    }
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-3.125rem !important",
      marginRight: "1.375rem",
      float: "right"
    }
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  searchIcon: {
    width: "1.0625rem",
    zIndex: "4"
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "0.125rem",
      border: "0.0625rem solid #FFF",
      right: "0.25rem",
      fontSize: "0.5625rem",
      background: dangerColor,
      color: "#FFFFFF",
      minWidth: "1rem",
      height: "1rem",
      borderRadius: "0.625rem",
      textAlign: "center",
      lineHeight: "1rem",
      verticalAlign: "middle",
      display: "block"
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "0.875rem",
      marginRight: "0.5rem"
    }
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    display: "inline-block"
  },
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "0.625rem 0.9375rem 0"
    },
    display: "inline-block"
  }
});

export default headerLinksStyle;
