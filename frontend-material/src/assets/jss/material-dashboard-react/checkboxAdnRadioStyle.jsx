import { primaryColor } from "assets/jss/material-dashboard-react.jsx";

const checkboxAdnRadioStyle = {
  root: {
    padding: "0.8125rem"
  },
  checked: {
    color: primaryColor + "!important"
  },
  checkedIcon: {
    width: "1.25rem",
    height: "1.25rem",
    border: "0.0625rem solid rgba(0, 0, 0, .54)",
    borderRadius: "0.1875rem"
  },
  uncheckedIcon: {
    width: "0rem",
    height: "0rem",
    padding: "0.625rem",
    border: "0.0625rem solid rgba(0, 0, 0, .54)",
    borderRadius: "0.1875rem"
  },
  radio: {
    color: primaryColor + "!important"
  },
  radioChecked: {
    width: "1.25rem",
    height: "1.25rem",
    border: "0.0625rem solid " + primaryColor,
    borderRadius: "50%"
  },
  radioUnchecked: {
    width: "0rem",
    height: "0rem",
    padding: "0.625rem",
    border: "0.0625rem solid rgba(0, 0, 0, .54)",
    borderRadius: "50%"
  }
};

export default checkboxAdnRadioStyle;
