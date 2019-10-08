import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import CartScrollBar from "./CartScrollBar";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Search from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import bag from "assets/img/bag.png";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false,
      showConfirm: false,
      showConfirmReset: false,
      isVolunteer: this.props.isVolunteer,
      handleCheckout: this.handleCheckout.bind(this),
      handleSave: this.props.handleSave,
      handleReset: this.props.handleReset
    };

  }

  handleCheckout() {
    this.setState({
      showCart: false
    });
    this.props.handleCheckout();
  }

  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }

  handleConfirm(e) {
    e.preventDefault();
    if(this.state.showConfirmReset) {
      this.setState({
        showConfirmReset: !this.state.showConfirmReset
      });
    }
    this.setState({
      showConfirm: !this.state.showConfirm
    });
  }

  handleConfirmReset(e) {
    e.preventDefault();
    if(this.state.showConfirm) {
      this.setState({
        showConfirm: !this.state.showConfirm
      });
    }
    this.setState({
      showConfirmReset: !this.state.showConfirmReset
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }

  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }

  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    if (cartNode && cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }

  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  render() {
    let view;
    if (this.props.cartActive) {
      let cartItems;
      cartItems = this.state.cart.map(product => {
        return (
          <li className="cart-item" key={product.name}>
            <img alt="" className="product-image" src={product.image} />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
            </div>
            <div className="product-total">
              <p className="quantity">
                {product.quantity} {product.quantity > 1 ? "items" : "item"}{" "}
              </p>
              <p className="amount">{product.quantity * product.price}</p>
            </div>
            <a
              className="product-remove"
              href="?"
              onClick={this.props.removeProduct.bind(this, product.id)}
            >
                ×
            </a>
          </li>
        );
      });
      if (cartItems.length <= 0) {
        view = <EmptyCart />;
      } else {
        view = (
          <CSSTransitionGroup
            className="cart-items"
            component="ul"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionName="fadeIn"
          >
            {cartItems}
          </CSSTransitionGroup>
        );
      }
    }
    return (
      <header>
        <div className="container">
          <div className="brand">
            <Icon
              alt="IRC Brand Logo"
              className="logo"
              src={Search}
            />
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <img
                alt="search"
                src={Search}
              />
            </a>
            <form
              action="#"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
              method="get"
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <img
                  alt="back"
                  src={Search}
                />
              </a>
              <input
                className="search-keyword"
                onChange={this.props.handleSearch}
                placeholder={this.props.placetext}
                ref="searchBox"
                type="search"
              />
            </form>
          </div>
          {this.props.cartActive?
            <div className="cart">
              <div className="cart-info">
                <table>
                  <tbody>
                    <tr>
                      <td>{this.state.isVolunteer ? "No. of Volunter Hours" : "No. of items"}</td>
                      <td>:</td>
                      <td>
                        <strong>{this.props.totalItems}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>{this.state.isVolunteer ? "Total Cost of Volunter Hours" : "Subtotal"}</td>
                      <td>:</td>
                      <td>
                        <strong>{this.props.total}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <a
                className="cart-icon"
                href="#"
                onClick={this.handleCart.bind(this)}
                ref="cartButton"
              >
                <img
                  alt="Cart"
                  className={this.props.cartBounce ? "tada" : " "}
                  src={bag}
                />
                {this.props.totalItems ? (
                  <span className="cart-count">{this.props.totalItems}</span>
                ) : (
                  ""
                )}
              </a>
              <div
                className={
                  this.state.showCart ? "cart-preview active" : "cart-preview"
                }
                ref="cartPreview"
              >
                <CartScrollBar>{view}</CartScrollBar>
                <div className="action-block">
                  <center>
                  Client Id: <Input onChange={(e) => this.props.handleClientIdChange(e)} />
                  </center>
                  <button
                    className={this.state.cart.length > 0 ? " " : "disabled"}
                    onClick={this.state.handleCheckout}
                    type="button"
                  >
                  PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div> : <div className={"confirm"}>
              <button
                onClick={this.handleConfirm.bind(this)}
                type="button"
              >
                        SAVE
              </button>
              <div
                className={
                  this.state.showConfirm ? "confirm-preview two active" : "confirm-preview"
                }
                ref="confirm"
              >
                <div className="action-block">
                  <button
                    className={""}
                    onClick={this.state.handleSave}
                    type="button"
                  >
                          CONFIRM
                  </button>
                </div>
              </div>
              <button
                onClick={this.handleConfirmReset.bind(this)}
                type="button"
              >
                        RESET
              </button>
              <div
                className={
                  this.state.showConfirmReset ? "confirm-preview active" : "confirm-preview"
                }
                ref="confirm"
              >
                <div className="action-block">
                  <button
                    className={""}
                    onClick={this.state.handleReset}
                    type="button"
                  >
                      CONFIRM
                  </button>
                </div>
              </div>
            </div>}
        </div>
      </header>
    );
  }
}

export default Header;
