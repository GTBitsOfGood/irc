import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
} from "assets/jss/material-dashboard-react.jsx";
const cardHeaderStyle = {
  cardHeader: {
    padding: "0.75rem 1.25rem",
    marginBottom: "0",
    borderBottom: "none",
    background: "transparent",
    zIndex: "3 !important",
    "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      margin: "0 0.9375rem",
      padding: "0",
      position: "relative",
      color: "#FFFFFF"
    },
    "&:first-child": {
      borderRadius: "calc(.25rem - 0.0625rem) calc(.25rem - 0.0625rem) 0 0"
    },
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      "&:not($cardHeaderIcon)": {
        borderRadius: "0.1875rem",
        marginTop: "-1.25rem",
        padding: "0.9375rem"
      }
    },
    "&$cardHeaderStats svg": {
      fontSize: "2.25rem",
      lineHeight: "3.5rem",
      textAlign: "center",
      width: "2.25rem",
      height: "2.25rem",
      margin: "0.625rem 0.625rem 0.25rem"
    },
    "&$cardHeaderStats i,&$cardHeaderStats .material-icons": {
      fontSize: "2.25rem",
      lineHeight: "3.5rem",
      width: "3.5rem",
      height: "3.5rem",
      textAlign: "center",
      overflow: "unset",
      marginBottom: "0.0625rem"
    },
    "&$cardHeaderStats$cardHeaderIcon": {
      textAlign: "right"
    }
  },
  cardHeaderPlain: {
    marginLeft: "0rem !important",
    marginRight: "0rem !important"
  },
  cardHeaderStats: {
    "& $cardHeaderIcon": {
      textAlign: "right"
    },
    "& h1,& h2,& h3,& h4,& h5,& h6": {
      margin: "0 !important"
    }
  },
  cardHeaderIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      background: "transparent",
      boxShadow: "none"
    },
    "& i,& .material-icons": {
      width: "2.0625rem",
      height: "2.0625rem",
      textAlign: "center",
      lineHeight: "2.0625rem"
    },
    "& svg": {
      width: "1.5rem",
      height: "1.5rem",
      textAlign: "center",
      lineHeight: "2.0625rem",
      margin: "0.3125rem 0.25rem 0rem"
    }
  },
  warningCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderIcon)": {
      ...warningCardHeader
    }
  },
  successCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderIcon)": {
      ...successCardHeader
    }
  },
  dangerCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderIcon)": {
      ...dangerCardHeader
    }
  },
  infoCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderIcon)": {
      ...infoCardHeader
    }
  },
  primaryCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderIcon)": {
      ...primaryCardHeader
    }
  },
  roseCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderIcon)": {
      ...roseCardHeader
    }
  }
};

export default cardHeaderStyle;
