import React, { Component } from 'react';
import './filter.css';
export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result-count">{this.props.count} Products</div>
        <div className="filter-sort">
          Order{' '}
          <select value={this.props.sort} onChange={this.props.filterOnSort}>
            <option value="latest">Latest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
        <div className="filter-size">
          Size{' '}
          <select value={this.props.size} onChange={this.props.filterOnSize}>
            <option value="ALL">ALL</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
