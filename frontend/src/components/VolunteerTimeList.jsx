import React, { Component } from 'react';
import { observer } from 'mobx-react';

class VolunteerTimeList extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(name, hours, id) {
    console.log(name, hours);
    return (
      <li className="list-group-item" key={id}>
        {name}
        <div style={{float: 'right'}}>
          <div className="input-group">
            <div className="input-group-append">{hours}</div>
          </div>
        </div>
      </li>
    )
  }

  render() {
    const { volunteers } = this.props.store.VolunteerTimeModel;
    return (
      <div id="cart">
        <div className="list-container">
          <h2>Volunteer Time</h2>
          <ul className="list-group">
            {volunteers.map((volunteer, id) => {
              if (volunteer.hours !== 0) {
                return this.renderItem(volunteer.name, volunteer.hours, id)
              }
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default VolunteerTimeList;
