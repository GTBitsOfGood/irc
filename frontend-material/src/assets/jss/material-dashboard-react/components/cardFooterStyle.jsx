const cardFooterStyle = {
  cardFooter: {
    padding: "0",
    paddingTop: "0.625rem",
    margin: "0 0.9375rem 0.625rem",
    borderRadius: "0",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    backgroundColor: "transparent",
    border: "0"
  },
  cardFooterProfile: {
    marginTop: "-0.9375rem"
  },
  cardFooterPlain: {
    paddingLeft: "0.3125rem",
    paddingRight: "0.3125rem",
    backgroundColor: "transparent"
  },
  cardFooterStats: {
    borderTop: "0.0625rem solid #eee",
    marginTop: "1.25rem",
    "& svg": {
      position: "relative",
      top: "0.25rem",
      marginRight: "0.1875rem",
      marginLeft: "0.1875rem",
      width: "1rem",
      height: "1rem"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      fontSize: "1rem",
      position: "relative",
      top: "0.25rem",
      marginRight: "0.1875rem",
      marginLeft: "0.1875rem"
    }
  },
  cardFooterChart: {
    borderTop: "0.0625rem solid #eee"
  }
};

export default cardFooterStyle;
