import React, { Component } from "react";
import Counter from "./Counter";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTable from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import CustomField from "components/CustomField.jsx";

import TextField from "@material-ui/core/TextField"

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
    this.props.updateProduct(event, {
          name: newName,
          price: this.props.price,
          id: this.props.id,
          quantity: this.props.quantity
        });
  }

  handlePriceChange(event) {
    let newPrice;
    newPrice = event.target.value;
    if (!isNaN(newPrice)) {
      this.props.updateProduct(event, {
            name: this.props.name,
            price: newPrice,
            id: this.props.id,
            quantity: this.props.quantity
          });
    }
  }

  handleMatchAmountChange(event) {
    let newAmount;
    newAmount = event.target.value;
    if (!isNaN(newAmount)) {
      this.props.updateProduct(event, {
            name: this.props.name,
            price: this.props.price,
            id: this.props.id,
            quantity: newAmount
          });
    }
  }

  handleDelete(event) {
    this.props.deleteProduct(event, this.props.id);
  }

  addToCart(name, price, id, quantity) {
    this.setState(
      {
        selectedProduct: {
          name: name,
          price: price,
          id: id,
          quantity: quantity
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
    let quantity = this.state.quantity;
    if (!this.props.edit) {
    return (
      <div className="product">
        <Card>
          <CardHeader color="warning" stats icon>
            <p className="product-name"><br></br>{this.props.name}</p>
          </CardHeader>
          {this.props.time? <div></div> : <center><h3 className="product-price">{this.props.price}</h3></center>}

          <center><Counter
            productQuantity={this.state.quantity}
            updateQuantity={this.updateQuantity}
            resetQuantity={this.resetQuantity}
            /></center>

              <center><div className="product-action">
                <button
                className={!this.state.isAdded ? "" : "added"}
                type="button"
                onClick={this.addToCart.bind(this, name, price, id, quantity)}
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
            variant="outlined"
            margin="normal"
            type="text"
            value={this.props.name}
            onChange={this.handleNameChange}
          />
          {this.props.time? <div></div> :
          <TextField
            label="Cost ($)"
            variant="outlined"
            margin="normal"
            type="text"
            value={this.props.price}
            onChange={this.handlePriceChange}
          />
          }
          <TextField
            label="Match Amount (0-100%)"
            variant="outlined"
            margin="normal"
            type="text"
            value={this.props.matchAmount}
            onChange={this.handleMatchAmountChange}
          />
          </CardBody>
          <center>
              <div className="product-action">
                <button
                className={!this.state.isAdded ? "" : "added"}
                type="button"
                onClick={this.handleDelete}
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
