import {
  grayColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor
} from "assets/jss/material-dashboard-react.jsx";

const buttonStyle = {
  button: {
    minHeight: "auto",
    minWidth: "auto",
    backgroundColor: grayColor,
    color: "#FFFFFF",
    boxShadow:
      "0 0.125rem 0.125rem 0 rgba(153, 153, 153, 0.14), 0 0.1875rem 0.0625rem -0.125rem rgba(153, 153, 153, 0.2), 0 0.0625rem 0.3125rem 0 rgba(153, 153, 153, 0.12)",
    border: "none",
    borderRadius: "0.1875rem",
    position: "relative",
    padding: "0.75rem 1.875rem",
    margin: ".3125rem 0.0625rem",
    fontSize: "0.75rem",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    "&:hover,&:focus": {
      color: "#FFFFFF",
      backgroundColor: grayColor,
      boxShadow:
        "0 0.875rem 1.625rem -0.75rem rgba(153, 153, 153, 0.42), 0 0.25rem 1.4375rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(153, 153, 153, 0.2)"
    },
    "& .fab,& .fas,& .far,& .fal, &.material-icons": {
      position: "relative",
      display: "inline-block",
      top: "0",
      marginTop: "-1em",
      marginBottom: "-1em",
      fontSize: "1.1rem",
      marginRight: "0.25rem",
      verticalAlign: "middle"
    },
    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      width: "1.125rem",
      height: "1.125rem",
      marginRight: "0.25rem",
      verticalAlign: "middle"
    },
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginTop: "0rem",
        position: "absolute",
        width: "100%",
        transform: "none",
        left: "0rem",
        top: "0rem",
        height: "100%",
        lineHeight: "2.5625rem",
        fontSize: "1.25rem"
      }
    }
  },
  white: {
    "&,&:focus,&:hover": {
      backgroundColor: "#FFFFFF",
      color: grayColor
    }
  },
  rose: {
    backgroundColor: roseColor,
    boxShadow:
      "0 0.125rem 0.125rem 0 rgba(233, 30, 99, 0.14), 0 0.1875rem 0.0625rem -0.125rem rgba(233, 30, 99, 0.2), 0 0.0625rem 0.3125rem 0 rgba(233, 30, 99, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: roseColor,
      boxShadow:
        "0 0.875rem 1.625rem -0.75rem rgba(233, 30, 99, 0.42), 0 0.25rem 1.4375rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(233, 30, 99, 0.2)"
    }
  },
  primary: {
    backgroundColor: primaryColor,
    boxShadow:
      "0 0.125rem 0.125rem 0 rgba(156, 39, 176, 0.14), 0 0.1875rem 0.0625rem -0.125rem rgba(156, 39, 176, 0.2), 0 0.0625rem 0.3125rem 0 rgba(156, 39, 176, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: primaryColor,
      boxShadow:
        "0 0.875rem 1.625rem -0.75rem rgba(156, 39, 176, 0.42), 0 0.25rem 1.4375rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(156, 39, 176, 0.2)"
    }
  },
  info: {
    backgroundColor: infoColor,
    boxShadow:
      "0 0.125rem 0.125rem 0 rgba(0, 188, 212, 0.14), 0 0.1875rem 0.0625rem -0.125rem rgba(0, 188, 212, 0.2), 0 0.0625rem 0.3125rem 0 rgba(0, 188, 212, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: infoColor,
      boxShadow:
        "0 0.875rem 1.625rem -0.75rem rgba(0, 188, 212, 0.42), 0 0.25rem 1.4375rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(0, 188, 212, 0.2)"
    }
  },
  success: {
    backgroundColor: successColor,
    boxShadow:
      "0 0.125rem 0.125rem 0 rgba(76, 175, 80, 0.14), 0 0.1875rem 0.0625rem -0.125rem rgba(76, 175, 80, 0.2), 0 0.0625rem 0.3125rem 0 rgba(76, 175, 80, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: successColor,
      boxShadow:
        "0 0.875rem 1.625rem -0.75rem rgba(76, 175, 80, 0.42), 0 0.25rem 1.4375rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(76, 175, 80, 0.2)"
    }
  },
  warning: {
    backgroundColor: warningColor,
    boxShadow:
      "0 0.125rem 0.125rem 0 rgba(255, 152, 0, 0.14), 0 0.1875rem 0.0625rem -0.125rem rgba(255, 152, 0, 0.2), 0 0.0625rem 0.3125rem 0 rgba(255, 152, 0, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: warningColor,
      boxShadow:
        "0 0.875rem 1.625rem -0.75rem rgba(255, 152, 0, 0.42), 0 0.25rem 1.4375rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(255, 152, 0, 0.2)"
    }
  },
  danger: {
    backgroundColor: dangerColor,
    boxShadow:
      "0 0.125rem 0.125rem 0 rgba(244, 67, 54, 0.14), 0 0.1875rem 0.0625rem -0.125rem rgba(244, 67, 54, 0.2), 0 0.0625rem 0.3125rem 0 rgba(244, 67, 54, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor,
      boxShadow:
        "0 0.875rem 1.625rem -0.75rem rgba(244, 67, 54, 0.42), 0 0.25rem 1.4375rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(244, 67, 54, 0.2)"
    }
  },
  simple: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF",
      background: "transparent",
      boxShadow: "none"
    },
    "&$rose": {
      "&,&:focus,&:hover,&:visited": {
        color: roseColor
      }
    },
    "&$primary": {
      "&,&:focus,&:hover,&:visited": {
        color: primaryColor
      }
    },
    "&$info": {
      "&,&:focus,&:hover,&:visited": {
        color: infoColor
      }
    },
    "&$success": {
      "&,&:focus,&:hover,&:visited": {
        color: successColor
      }
    },
    "&$warning": {
      "&,&:focus,&:hover,&:visited": {
        color: warningColor
      }
    },
    "&$danger": {
      "&,&:focus,&:hover,&:visited": {
        color: dangerColor
      }
    }
  },
  transparent: {
    "&,&:focus,&:hover": {
      color: "inherit",
      background: "transparent",
      boxShadow: "none"
    }
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none"
  },
  lg: {
    padding: "1.125rem 2.25rem",
    fontSize: "0.875rem",
    lineHeight: "1.333333",
    borderRadius: "0.2rem"
  },
  sm: {
    padding: "0.40625rem 1.25rem",
    fontSize: "0.6875rem",
    lineHeight: "1.5",
    borderRadius: "0.2rem"
  },
  round: {
    borderRadius: "1.875rem"
  },
  block: {
    width: "100% !important"
  },
  link: {
    "&,&:hover,&:focus": {
      backgroundColor: "transparent",
      color: "#999999",
      boxShadow: "none"
    }
  },
  justIcon: {
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    fontSize: "1.25rem",
    height: "2.5625rem",
    minWidth: "2.5625rem",
    width: "2.5625rem",
    "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
      marginRight: "0rem"
    },
    "&$lg": {
      height: "3.5625rem",
      minWidth: "3.5625rem",
      width: "3.5625rem",
      lineHeight: "3.5rem",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "2rem",
        lineHeight: "3.5rem"
      },
      "& svg": {
        width: "2rem",
        height: "2rem"
      }
    },
    "&$sm": {
      height: "1.875rem",
      minWidth: "1.875rem",
      width: "1.875rem",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "1.0625rem",
        lineHeight: "1.8125rem"
      },
      "& svg": {
        width: "1.0625rem",
        height: "1.0625rem"
      }
    }
  }
};

export default buttonStyle;
