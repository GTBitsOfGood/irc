import React from 'react';

import Shop from 'components/Storefront/Shop.jsx';
import Search from 'components/Storefront/Search.jsx';
import Summary from 'components/Storefront/Summary.jsx';

import withStyles from '@material-ui/core/styles/withStyles';
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

class Storefront extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (null);
  }
}

export default withStyles(dashboardStyle)(Storefront);
