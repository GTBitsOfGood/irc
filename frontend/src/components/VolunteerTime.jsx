import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import Autocomplete from 'react-autocomplete';

import VolunteerTimeList from './VolunteerTimeList';

@observer
class VolunteerTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      volunteerName: '',
      hours: '',
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { VolunteerTimeModel } = this.props.store;
    return (
      <div id="store">
        <div className="list-container">
          <Autocomplete
            getItemValue={(item) => item.name}
            items={VolunteerTimeModel.volunteers.filter(volunteer => volunteer.name.toLowerCase().includes(this.state.volunteerName.toLowerCase()))}
            renderItem={(item, isHighlighted) => {
              return (
                <div>
                  {item.name}
                </div>
              )
            }}
            value={this.state.volunteerName}
            onChange={(e) => {
              this.setState({ volunteerName: e.target.value })
            }}
            onSelect={(value) => {
              this.openModal()
              this.setState({ volunteerName: value })
            }}
          />
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <h2>Add Volunteer Time</h2>
            <div className="input-group">
              <input type="text" style={{maxWidth: 100}} className="form-control" onChange={(e) => {
                this.setState({ hours: e.target.value });
              }} />
              <div className="input-group-append">
                <button className="btn btn-outline-success" onClick={() => {
                  VolunteerTimeModel.addTime(this.state.volunteerName, this.state.hours);
                  this.closeModal();
                }}>Add</button>
              </div>
            </div>
            <button className="btn btn-outline-dark" onClick={() => {
              this.closeModal();
            }}>Cancel</button>
          </Modal>
          <VolunteerTimeList store={this.props.store} />
        </div>
      </div>
    );
  }
}

export default VolunteerTime;
