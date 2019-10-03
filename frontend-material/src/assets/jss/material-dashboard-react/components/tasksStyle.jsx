import {
  defaultFont,
  primaryColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.jsx";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";
const tasksStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  table: {
    marginBottom: "0",
    overflow: "visible"
  },
  tableRow: {
    position: "relative",
    borderBottom: "0.0625rem solid #dddddd"
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "0.75rem 0.5rem !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "0.5rem",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "0.875rem"
  },
  tableActionButton: {
    width: "1.6875rem",
    height: "1.6875rem",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "1.0625rem",
    height: "1.0625rem"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
    boxShadow: "none"
  }
};
export default tasksStyle;
