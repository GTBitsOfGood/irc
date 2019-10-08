import React, { Component } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

class Products extends Component {

  render() {
    let productsData;
    let term = this.props.searchTerm;

    function searchingFor(term) {
      return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
    productsData = this.props.productsList
      .filter(searchingFor(term))
      .map(product => {
        return (
          <Product
            addToCart={this.props.addToCart}
            deleteProduct={this.props.deleteProduct}
            edit={this.props.editMode}
            id={product.id}
            key={product.id}
            name={product.name}
            percentageMatched={product.percentageMatched}
            price={product.price}
            productQuantity={this.props.productQuantity}
            revisionNumber={product.revisionNumber}
            time={this.props.time}
            updateProduct={this.props.updateProduct}
            updateQuantity={this.props.updateQuantity}
          />
        );
      });

    // Empty and Loading States
    let view;
    if (productsData.length <= 0 && !term) {
      view = <LoadingProducts />;
    } else if (productsData.length <= 0 && term) {
      view = <NoResults />;
    } else {
      let view_content;
      view_content = productsData.map(product => {
        return (
          <GridItem md={4} sm={12} xs={12}>
            {product}
          </GridItem>
        );
      });
      view = (
        <GridContainer>
          {view_content}
        </GridContainer>
      );
    }
    return <div className="products-wrapper">{view}</div>;
  }
}

export default Products;
