import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";

const sidebarStyle = theme => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      ...boxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0rem",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition
    }
  },
  logo: {
    position: "relative",
    padding: "0.9375rem 0.9375rem",
    zIndex: "4",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",

      height: "0.0625rem",
      right: "0.9375rem",
      width: "calc(100% - 1.875rem)",
      backgroundColor: "rgba(180, 180, 180, 0.3)"
    }
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "0.3125rem 0",
    display: "block",
    fontSize: "1.125rem",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "1.875rem",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover": {
      color: "#FFFFFF"
    }
  },
  logoImage: {
    width: "1.875rem",
    display: "inline-block",
    maxHeight: "1.875rem",
    marginLeft: "0.625rem",
    marginRight: "0.9375rem"
  },
  img: {
    width: "2.1875rem",
    top: "1.375rem",
    position: "absolute",
    verticalAlign: "middle",
    border: "0"
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: "#000",
      opacity: ".8"
    }
  },
  list: {
    marginTop: "1.25rem",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset"
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: "#FFFFFF"
    }
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "0.625rem 0.9375rem 0",
    borderRadius: "0.1875rem",
    position: "relative",
    display: "block",
    padding: "0.625rem 0.9375rem",
    backgroundColor: "transparent",
    ...defaultFont
  },
  itemIcon: {
    width: "1.5rem",
    height: "1.875rem",
    fontSize: "1.5rem",
    lineHeight: "1.875rem",
    float: "left",
    marginRight: "0.9375rem",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgba(255, 255, 255, 0.8)"
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "1.875rem",
    fontSize: "0.875rem",
    color: "#FFFFFF"
  },
  whiteFont: {
    color: "#FFFFFF"
  },
  purple: {
    backgroundColor: primaryColor,
    ...primaryBoxShadow,
    "&:hover": {
      backgroundColor: primaryColor,
      ...primaryBoxShadow
    }
  },
  blue: {
    backgroundColor: infoColor,
    boxShadow:
      "0 0.75rem 1.25rem -0.625rem rgba(0,188,212,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(0,188,212,.2)",
    "&:hover": {
      backgroundColor: infoColor,
      boxShadow:
        "0 0.75rem 1.25rem -0.625rem rgba(0,188,212,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(0,188,212,.2)"
    }
  },
  green: {
    backgroundColor: successColor,
    boxShadow:
      "0 0.75rem 1.25rem -0.625rem rgba(76,175,80,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(76,175,80,.2)",
    "&:hover": {
      backgroundColor: successColor,
      boxShadow:
        "0 0.75rem 1.25rem -0.625rem rgba(76,175,80,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(76,175,80,.2)"
    }
  },
  orange: {
    backgroundColor: warningColor,
    boxShadow:
      "0 0.75rem 1.25rem -0.625rem rgba(255,152,0,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(255,152,0,.2)",
    "&:hover": {
      backgroundColor: warningColor,
      boxShadow:
        "0 0.75rem 1.25rem -0.625rem rgba(255,152,0,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(255,152,0,.2)"
    }
  },
  red: {
    backgroundColor: dangerColor,
    boxShadow:
      "0 0.75rem 1.25rem -0.625rem rgba(244,67,54,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(244,67,54,.2)",
    "&:hover": {
      backgroundColor: dangerColor,
      boxShadow:
        "0 0.75rem 1.25rem -0.625rem rgba(244,67,54,.28), 0 0.25rem 1.25rem 0 rgba(0,0,0,.12), 0 0.4375rem 0.5rem -0.3125rem rgba(244,67,54,.2)"
    }
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 4.6875rem)",
    overflow: "auto",
    width: "16.25rem",
    zIndex: "4",
    overflowScrolling: "touch"
  },
  activePro: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      width: "100%",
      bottom: "0.8125rem"
    }
  }
});

export default sidebarStyle;
