import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Store extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.renderListItem = this.renderListItem.bind(this);
  }

  addItem(item, quantity) {
    this.props.store.ShoppingCartModel.addItem(item, quantity);
  }

  renderListItem(item, id) {
    return (
      <li className="list-group-item" key={id}>
        {item.name}
        <div style={{float: 'right'}}>
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
        </div>
      </li>
    )
  }

  render() {
    return (
      <div id="store">
        <div className="list-container">
          <ul className="list-group">
            {this.props.store.StoreModel.items.map((item, id) => this.renderListItem(item, id))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Store;
