import { successColor } from "assets/jss/material-dashboard-react.jsx";

const dashboardStyle = {
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "1rem",
    height: "1rem"
  },
  stats: {
    color: "#999999",
    display: "inline-flex",
    fontSize: "0.75rem",
    lineHeight: "1.375rem",
    "& svg": {
      top: "0.25rem",
      width: "1rem",
      height: "1rem",
      position: "relative",
      marginRight: "0.1875rem",
      marginLeft: "0.1875rem"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "0.25rem",
      fontSize: "1rem",
      position: "relative",
      marginRight: "0.1875rem",
      marginLeft: "0.1875rem"
    }
  },
  cardCategory: {
    color: "#999999",
    margin: "0",
    fontSize: "0.875rem",
    marginTop: "0",
    paddingTop: "0.625rem",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "0.875rem",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: "#3C4858",
    marginTop: "0rem",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0.1875rem",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0rem",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0.1875rem",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

export default dashboardStyle;
