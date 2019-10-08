import React from "react";
import empty_cart from "assets/img/empty-cart.png";

const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        alt="empty-cart"
        src={empty_cart}
      />
      <h2>Your cart is empty!</h2>
    </div>
  );
};

export default EmptyCart;
