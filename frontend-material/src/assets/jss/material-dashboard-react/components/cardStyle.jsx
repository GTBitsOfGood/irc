const cardStyle = {
  card: {
    border: "0",
    marginBottom: "1.875rem",
    marginTop: "1.875rem",
    borderRadius: "0.375rem",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    boxShadow: "0 0.0625rem 0.25rem 0 rgba(0, 0, 0, 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem"
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardProfile: {
    marginTop: "1.875rem",
    textAlign: "center"
  },
  cardChart: {
    "& p": {
      marginTop: "0rem",
      paddingTop: "0rem"
    }
  }
};

export default cardStyle;
