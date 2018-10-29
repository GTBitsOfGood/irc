import React, { Component } from 'react';
import { observer } from 'mobx-react';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(name, quantity, id) {
    return (
      <li className="list-group-item" key={id}>
        {name}
        <div style={{float: 'right'}}>
          <div className="input-group">
            <div className="input-group-append">{quantity}</div>
          </div>
        </div>
      </li>
    )
  }

  render() {
    const { items } = this.props.store.ShoppingCartModel;
    return (
      <div id="cart">
        <div className="list-container">
          <ul className="list-group">
            {Object.entries(items).map((item, id) => this.renderItem(item[0], item[1], id))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;
