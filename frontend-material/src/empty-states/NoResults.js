import React, { Component } from "react";
import tree from "assets/img/bare-tree.png"


const NoResults = () => {
  return (
    <div className="products">
      <div className="no-results">
        <img
          src={tree}
          alt="Empty Tree"
        />
        <h2>Sorry, no products matched your search!</h2>
        <p>Enter a different keyword and try again.</p>
      </div>
    </div>
  );
};

export default NoResults;
