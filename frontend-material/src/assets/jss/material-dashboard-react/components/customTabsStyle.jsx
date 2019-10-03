const customTabsStyle = {
  cardTitle: {
    float: "left",
    padding: "0.625rem 0.625rem 0.625rem 0rem",
    lineHeight: "1.5rem"
  },
  cardTitleRTL: {
    float: "right",
    padding: "0.625rem 0rem 0.625rem 0.625rem !important"
  },
  displayNone: {
    display: "none !important"
  },
  tabsRoot: {
    minHeight: "unset !important",
    overflowX: "visible",
    "& $tabRootButton": {
      fontSize: "0.875rem"
    }
  },
  tabRootButton: {
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    padding: "0.625rem 0.9375rem",
    borderRadius: "0.1875rem",
    lineHeight: "1.5rem",
    border: "0 !important",
    color: "#fff !important",
    marginLeft: "0.25rem",
    "&:last-child": {
      marginLeft: "0rem"
    }
  },
  tabLabelContainer: {
    padding: "0rem"
  },
  tabLabel: {
    fontWeight: "500",
    fontSize: "0.75rem"
  },
  tabSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "0.2s background-color 0.1s"
  },
  tabWrapper: {
    display: "inline-block",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    "& > svg,& > .material-icons": {
      verticalAlign: "middle",
      margin: "-0.0625rem 0.3125rem 0 0"
    }
  }
};

export default customTabsStyle;
