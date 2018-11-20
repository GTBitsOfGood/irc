import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import Autocomplete from 'react-autocomplete';

@observer
class Store extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      modalIsOpen: false,
    };

    this.renderListItem = this.renderListItem.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  addItem(item, quantity) {
    this.props.store.ShoppingCartModel.addItem(item, quantity);
  }

  renderListItem(item, id) {
    return (
      <li className="list-group-item" key={id}>
        {item.name}
        {/*<div style={{float: 'right'}}>
          <div className="input-group">
            <input type="text" style={{maxWidth: 100}} className="form-control" onChange={(e) => {
              this.setState({ [`${item.name}`]: e.target.value });
            }} />
            <div className="input-group-append">
              <button className="btn btn-outline-success" onClick={() => {
                this.addItem(item.name, this.state[`${item.name}`]);
              }}>Add</button>
            </div>
          </div>
        </div>*/}
      </li>
    )
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { StoreModel } = this.props.store;
    return (
      <div id="store">
        <div className="list-container">
          <Autocomplete
            getItemValue={(item) => item.name}
            items={StoreModel.items.filter(item => item.name.toLowerCase().includes(this.state.value.toLowerCase()) && this.state.value !== '')}
            renderItem={(item, isHighlighted) => {
              console.log(item.name)
              return (
                <div>
                  {item.name}
                </div>
              )
            }}
            value={this.state.value}
            onChange={(e) => {
              console.log(e.target.value)
              this.setState({ value: e.target.value })
            }}
            onSelect={(value) => {
              this.openModal()
              this.setState({ value })
            }}
          />
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <h2>Add Donation Item</h2>
            <div className="input-group">
              <input type="text" style={{maxWidth: 100}} className="form-control" onChange={(e) => {
                this.setState({ [`${item.name}`]: e.target.value });
              }} />
              <div className="input-group-append">
                <button className="btn btn-outline-success" onClick={() => {
                  this.addItem(item.name, this.state[`${item.name}`]);
                  this.closeModal();
                }}>Add</button>
              </div>
            </div>
            <button className="btn btn-outline-dark" onClick={() => {
              this.closeModal();
            }}>Cancel</button>
          </Modal>
          {/*<ul className="list-group">
            {StoreModel.items.map((item, id) => this.renderListItem(item, id))}
          </ul>*/}
        </div>
      </div>
    );
  }
}

export default Store;
