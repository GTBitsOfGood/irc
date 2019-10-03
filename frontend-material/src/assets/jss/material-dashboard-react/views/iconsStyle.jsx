import { boxShadow } from "assets/jss/material-dashboard-react.jsx";

const iconsStyle = {
  iframe: {
    width: "100%",
    height: "31.25rem",
    border: "0",
    ...boxShadow
  },
  iframeContainer: {
    margin: "0 -1.25rem 0"
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "0.875rem",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
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

export default iconsStyle;
