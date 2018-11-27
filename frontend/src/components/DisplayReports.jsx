import React, { Component } from 'react';

class DisplayReports extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-4">{item.name}</div>
          <div className="col-2">{item.price}</div>
          <div className="col-2">{item.percentageMatched}</div>
          <div className="col-2">{item.dateUpdated}</div>
          <div className="col-2">{item.revisionNumber}</div>
        </div>
      </li>
    )
  }

  render() {
    const { items } = this.props.store.StoreModel;

    return (
      <div className="reports-container">
        <div className="row">
          <div className="list-container">
            <h2>Donations</h2>
            <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-4">Name</div>
                <div className="col-2">Price</div>
                <div className="col-2">Percentage Matched</div>
                <div className="col-2">Date Updated</div>
                <div className="col-2">Revision Number</div>
              </div>
            </li>
              {items.map((item) => this.renderItem(item))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="list-container">
            <h2>Volunteer Time</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-4">Name</div>
                  <div className="col-2">Price</div>
                  <div className="col-2">Percentage Matched</div>
                  <div className="col-2">Date Updated</div>
                  <div className="col-2">Revision Number</div>
                </div>
              </li>
              {items.map((item) => this.renderItem(item))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayReports;
