import React, { Component } from "react";

import Header from "components/Shop_Header";
import Products from "components/Products";
import ErrorDialog from "components/ErrorDialog";
import {callBackendAPI} from "components/CallBackendApi";

import "assets/css/style.css";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class ShopStore extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      cartBounce: false,
      quantity: 1,
      modalActive: false,
      open: false,
      message: "",
      clientId: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClientIdChange = this.handleClientIdChange.bind(this);

  }

  // Fetch Initial Set of Products from external API
  getProducts() {
    callBackendAPI("/api/transactions/getVolunteerItems", "get")
      .then(response => {
        if (response.error != null) {
          this.setState({
            open: true,
            message: response.message
          });
        } else {
          this.setState({
            products: response
          });
        }
      });
  }

  componentWillMount() {
    this.getProducts();
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }

  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(x => x.id === productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
        });
      }.bind(this),
      500
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id === id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += parseInt(cart[i].quantity, 10);
    }
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity, 10);
    }
    this.setState({
      totalAmount: total
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    this.setState({
      quantity: qty
    });
  }

  //Handles the checking out of items
  //Currently searches by aliennumber
  handleCheckout() {
    let postedCart = [];
    let userID;
    for (var i = 0; i < this.state.cart.length; i++) {
      postedCart.push({
        item: this.state.cart[i],
        count: this.state.cart[i].quantity
      });
    }
    callBackendAPI('/api/verify', 'post', {}).then(response => {
      userID = response.user._id;
      callBackendAPI('/api/getAllClients', 'get').then(response => {
        let i = 0;
        let searching = true;
        while(i < response.length && searching) {
          if (response[i].alienNumber === Number(this.state.clientId)) {
            callBackendAPI('/api/transactions/addTransaction', 'post', {
              transaction: {
                volunteerItems:postedCart,
                shopItems: [],
                authorizedUser: userID,
                clientId: response[i]._id,
                type: "VOLUNTEER"
              }
            }).then(response => {
              if (response) {console.log(response);}
            })
            searching = false;
          }
          i++;
        }
        if (searching) {
          this.setState({
            open: true,
            message: "Invalid Client Id!"
          });
        }
      });
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleClientIdChange = event => {
    this.setState({ clientId: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <Header
          placetext="Search for items..."
          cartActive={true}
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
          isVolunteer={false}
          handleCheckout={this.handleCheckout}
          handleClientIdChange={(e) => this.handleClientIdChange(e)}
        />
        <Products
          editMode={false}
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          time={true}
        />
        <ErrorDialog
          open = {this.state.open}
          handleClose = {this.handleClose}
          message = {this.state.message}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ShopStore);
