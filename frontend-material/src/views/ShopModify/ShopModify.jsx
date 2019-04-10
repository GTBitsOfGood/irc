import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "components/Shop_Header";
import Products from "components/Products";
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

class ShopMod extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      modalActive: false,
      orig_products: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }
  // Fetch Initial Set of Products from external API
  getProducts() {
    this.callBackendAPI('/api/transactions/getShopItems', 'get')
      .then(response => {
        this.setState({
          products: response
        });
      });
  }
  componentWillMount() {
    this.getProducts();
  }

  callBackendAPI = async (route, type ,body) => {
    if (type=='post') {
      const response = await fetch(route, {
        method: type,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const json = await response.json();
      if (json.errorCode != 200) {
        this.setState({
          open: true,
          message: json.message
        });
      } else {
        return json.body;
      }
    } else {
      const response = await fetch(route, {
        method: type,
      });
      const json = await response.json();
      if (json.errorCode != 200) {
        this.setState({
          open: true,
          message: json.message
        });
      } else {
        return json.body;
      }
    }
    };

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty
    });
  }

  // Update product list
  handleUpdateProduct(e, product) {

    let up_products = this.state.products;
    let index = up_products.findIndex(x => x.id == product.id);
    up_products[index] = product;

    this.setState({
      products: up_products
    });
    e.preventDefault();
  }

  // Update product list
  handleDeleteProduct(e, id) {
    let products = this.state.products;
    let index = products.findIndex(x => x.id == id);
    products.splice(index, 1);
    this.setState({
      products: products
    });
  }


  //This method handles if the admin wants to reset their changes
  handleReset() {
      this.setState({
        products: this.state.orig_products.slice()
      });
  }

  //This method handles if the admin wants to save their changes to the database
  handleSave() {
    // callBackendAPI('/api/transactions/updateItems')
  }

  render() {
    return (
      <div className="container">
        <Header
          placetext="Search for items..."
          cartActive={false}
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
          handleSave={this.handleSave}
          handleReset={this.handleReset}
        />
        <Products
          editMode={true}
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          updateProduct={this.handleUpdateProduct}
          deleteProduct={this.handleDeleteProduct}
          time={false}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ShopMod);
