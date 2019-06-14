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
            edit={this.props.editMode}
            key={product.id}
            price={product.price}
            name={product.name}
            id={product.id}
            percentageMatched={product.percentageMatched}
            revisionNumber={product.revisionNumber}
            addToCart={this.props.addToCart}
            productQuantity={this.props.productQuantity}
            updateQuantity={this.props.updateQuantity}
            updateProduct={this.props.updateProduct}
            deleteProduct={this.props.deleteProduct}
            time={this.props.time}
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
              <GridItem xs={12} sm={12} md={4}>
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
