import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.productQuantity };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(e) {
    this.setState(
      prevState => ({
        value: Number(prevState.value) + 1
      }),
      function() {
        this.props.updateQuantity(this.state.value);
      }
    );
    e.preventDefault();
  }

  decrement(e) {
    e.preventDefault();
    if (this.state.value <= 1) {
      return this.state.value;
    } else {
      this.setState(
        prevState => ({
          value: Number(prevState.value) - 1
        }),
        function() {
          this.props.updateQuantity(this.state.value);
        }
      );
    }
  }

  feed(e) {
    if (this.refs.feedQty.value <= -1) {
      this.setState({
        value: 1
      },
      function() {
        this.props.updateQuantity(1);
      }
      );
    } else {
      this.setState(
        {
          value: this.refs.feedQty.value
        },
        function() {
          this.props.updateQuantity(this.state.value);
        }
      );
    }
  }

  resetQuantity() {
    this.setState({
      value: 1
    });
  }
  render() {
    return (
      <div className="stepper-input">
        <a className="decrement" href="#" onClick={this.decrement}>
          –
        </a>
        <input
          className="quantity"
          onChange={this.feed.bind(this)}
          ref="feedQty"
          type="number"
          value={this.state.value}
        />
        <a className="increment" href="#" onClick={this.increment}>
          +
        </a>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
