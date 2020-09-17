import React from 'react';
import Products from './components/Products/Products';
import data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href='/'>Shopping Cart</a>
        </header>
        <main>
          <section className="content">
            <section className="products">
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
