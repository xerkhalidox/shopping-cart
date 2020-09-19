import React from 'react';
import Filter from './components/Filter/Filter';
import Products from './components/Products/Products';
import data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "ALL",
      sort: "latest",
    };
  }
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
  render() {
    return (
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
              <Products products={this.state.products} />
            </section>
            <aside className="cart">Cart</aside>
          </section>
        </main>
        <footer>
          All rights reserved
      </footer>
      </div>
    );
  }
}

export default App;
