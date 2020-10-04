import React, { Component } from 'react';
import './products.css';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/prodcut_actions';
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  productsArray() {
    if (!this.props.products) {
      return <div>Loading...</div>;
    }
    return this.props.products.map((product, index) => {
      return (
        <li key={index}>
          <div className='product'>
            <a href={'#' + product._id}>
              <img
                src={product.image}
                alt={product.title}
                onClick={() => this.openModal(product)}
              />
              <p>{product.title}</p>
            </a>
            <div className='product-price'>
              <p>${product.price}</p>
              <button
                onClick={() => {
                  this.props.addToCart(product);
                }}
                className='btn primary'
              >
                Add to Cart
              </button>
            </div>
          </div>
        </li>
      );
    });
  }
  openModal(product) {
    this.setState({ product });
  }
  closeModal() {
    this.setState({ product: null });
  }
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {' '}
          <ul className='products-list'>{this.productsArray()}</ul>
        </Fade>
        {product && (
          <Modal isOpen onRequestClose={() => this.closeModal()}>
            <Zoom>
              <button className='modal-close' onClick={() => this.closeModal()}>
                X
              </button>
              <div className='modal-product-details'>
                <img src={product.image} alt={product.title} />
                <div className='product-description'>
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes:
                    {product.availableSizes.map((size) => (
                      <span>
                        {' '}
                        <button className='btn'>{size}</button>
                      </span>
                    ))}
                  </p>
                  <div className='product-price'>
                    <p>${product.price}</p>
                    <button
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                      className='btn'
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
