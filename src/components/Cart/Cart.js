import React, { Component } from 'react';
import './cart.css';

export default class Cart extends Component {
    cartItemsList() {
        const cartItems = this.props.cartItems;
        return cartItems.map((item, index) => {
            return (
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            <li key={index}>
                                <div>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div>
                                    <div>
                                        {item.title}
                                    </div>
                                    <div className="right">
                                        ${item.price}{" x" + item.count + " "}
                                        <button className="btn" onClick={() => this.props.deleteItemFromCart(item)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="cart">
                        <div className="total">
                            {index === cartItems.length - 1 &&
                                <div >
                                    Total:{" "} ${cartItems.reduce((prev, curr) => prev + (curr.price * curr.count), 0)}
                                    <button className="btn">Proceed</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            );
        });
    }
    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {
                    //check if cart has items or not

                    cartItems.length === 0
                        ?
                        <div className="cart cart-header">
                            Cart is empty
                        </div>
                        : //else
                        <div className="cart cart-header">
                            You have {cartItems.length} items in the cart
                        </div>
                }
                {this.cartItemsList()}
            </div>
        );
    }
}
