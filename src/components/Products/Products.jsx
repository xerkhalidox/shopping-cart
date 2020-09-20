import React, { Component } from 'react';
import './products.css';

export default class Products extends Component {
  productsArray() {
    return this.props.products.map((product, index) => {
      return (
        <li key={index}>
          <div className="product">
            <a href="/">
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
            </a>
            <div className="product-price">
              <p>${product.price}</p>
              <button
                onClick={() => {
                  this.props.addToCart(product);
                }}
                className="btn primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <ul className="products-list">{this.productsArray()}</ul>
      </div>
    );
  }
}
