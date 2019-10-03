import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";

const typographyStyle = {
  defaultFontStyle: {
    ...defaultFont,
    fontSize: "0.875rem"
  },
  defaultHeaderMargins: {
    marginTop: "1.25rem",
    marginBottom: "0.625rem"
  },
  quote: {
    padding: "0.625rem 1.25rem",
    margin: "0 0 1.25rem",
    fontSize: "1.0938rem",
    borderLeft: "0.3125rem solid #eee"
  },
  quoteText: {
    margin: "0 0 0.625rem",
    fontStyle: "italic"
  },
  quoteAuthor: {
    display: "block",
    fontSize: "80%",
    lineHeight: "1.42857143",
    color: "#777"
  },
  mutedText: {
    color: "#777"
  },
  primaryText: {
    color: primaryColor
  },
  infoText: {
    color: infoColor
  },
  successText: {
    color: successColor
  },
  warningText: {
    color: warningColor
  },
  dangerText: {
    color: dangerColor
  }
};

export default typographyStyle;
