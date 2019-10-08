import React, { Component } from "react";
import Counter from "./Counter";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import TextField from "@material-ui/core/TextField";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      isAdded: false,
      quantity: 1
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleMatchAmountChange = this.handleMatchAmountChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  updateQuantity(qty) {
    this.setState({
      quantity: qty
    });
  }

  handleNameChange(event) {
    let newName;
    newName = event.target.value;
    this.props.updateProduct(event, "name", this.props.id, newName);
  }

  handlePriceChange(event) {
    let newPrice;
    newPrice = event.target.value;
    if (!isNaN(newPrice)) {
      this.props.updateProduct(event, "price", this.props.id, newPrice);
    }
  }

  handleMatchAmountChange(event) {
    let newAmount;
    newAmount = event.target.value;
    if (!isNaN(newAmount)) {
      this.props.updateProduct(event, "matched", this.props.id, newAmount);
    }
  }

  handleDelete(event) {
    this.props.deleteProduct(event, this.props.id);
  }

  addToCart(name, price, id, quantity, percentageMatched, revisionNumber) {
    this.setState(
      {
        selectedProduct: {
          name: name,
          price: price,
          id: id,
          quantity: quantity,
          percentageMatched: percentageMatched,
          revisionNumber: revisionNumber
        }
      },
      function() {
        this.props.addToCart(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }
  render() {
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
    let percentageMatched = this.props.percentageMatched;
    let revisionNumber = this.props.revisionNumber;
    let quantity = this.state.quantity;
    if (!this.props.edit) {
      return (
        <div className="product">
          <Card>
            <CardHeader color="warning" icon={true} stats={true}>
              <p className="product-name"><br />{this.props.name}</p>
            </CardHeader>
            {this.props.time? <div /> : <center><h3 className="product-price">{this.props.price}</h3></center>}

            <center><Counter
              productQuantity={this.state.quantity}
              resetQuantity={this.resetQuantity}
              updateQuantity={this.updateQuantity}
            /></center>

            <center><div className="product-action">
              <button
                className={!this.state.isAdded ? "" : "added"}
                onClick={this.addToCart.bind(this, name, price, id, quantity, percentageMatched, revisionNumber)}
                type="button"
              >
                {this.props.time? (!this.state.isAdded ? "ADD HOURS" : "✔ ADDED") : (!this.state.isAdded ? "ADD TO CART" : "✔ ADDED")}
              </button>
            </div></center>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="product">
          <Card>
            <CardBody>
              <TextField
                label="Name"
                margin="normal"
                onChange={this.handleNameChange}
                type="text"
                value={this.props.name}
                variant="outlined"
              />
              {this.props.time? <div /> :
                <TextField
                  label="Cost ($)"
                  margin="normal"
                  onChange={this.handlePriceChange}
                  type="text"
                  value={this.props.price}
                  variant="outlined"
                />}
              <TextField
                label="Match Amount (0-100%)"
                margin="normal"
                onChange={this.handleMatchAmountChange}
                type="text"
                value={this.props.matchAmount}
                variant="outlined"
              />
            </CardBody>
            <center>
              <div className="product-action">
                <button
                  className={!this.state.isAdded ? "" : "added"}
                  onClick={this.handleDelete}
                  type="button"
                >
                DELETE
                </button>
              </div>
            </center>
          </Card>
        </div>
      );
    }
  }
}

export default Product;
