import React from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart/Cart';
import Filter from './components/Filter/Filter';
import Products from './components/Products/Products';
import data from './data.json';
import store from './store';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "ALL",
      sort: "latest",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let isInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        isInCart = true;
      }
    });
    if (!isInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems: cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  deleteItemFromCart = (givenItem) => {
    let cartItems = this.state.cartItems.slice();
    cartItems = cartItems.filter(item =>
      item._id !== givenItem._id
    );
    this.setState({ cartItems: cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  filterOnSize = (e) => {
    if (e.target.value === 'ALL') {
      this.setState({
        size: e.target.value,
        products: data.products
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(product =>
          product.availableSizes.indexOf(e.target.value) >= 0
        )
      });
    }
  };

  filterOnSort = (e) => {
    this.setState({
      sort: e.target.value,
      products: this.state.products.slice().sort((a, b) => {
        if (e.target.value === "highest") {
          if (a.price < b.price) {
            return 1;
          }
          return -1;
        }
        if (e.target.value === "lowest") {
          if (a.price > b.price) {
            return 1;
          }
          return -1;
        }
        if (e.target.value === "latest") {
          if (a._id < b._id) {
            return 1;
          }
          return -1;
        }
        return 0;
      })
    });
  };
  createOrder = (order) => {
    alert(order);
  };
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href='/'>Shopping Cart</a>
          </header>
          <main>
            <section className="content">
              <section className="products">
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterOnSize={this.filterOnSize}
                  filterOnSort={this.filterOnSort}
                />
                <Products products={this.state.products} addToCart={this.addToCart} />
              </section>
              <aside className="cart">
                <Cart
                  cartItems={this.state.cartItems}
                  deleteItemFromCart={this.deleteItemFromCart}
                  createOrder={this.createOrder}
                >
                </Cart>
              </aside>
            </section>
          </main>
          <footer>
            All rights reserved
      </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
