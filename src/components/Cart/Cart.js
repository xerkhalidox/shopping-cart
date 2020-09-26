import React, { Component } from 'react';
import './cart.css';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            showCheckout: false,
            name: "",
            email: "",
            address: ""
        };
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            email: this.state.email,
            name: this.state.name,
            address: this.state.address,
            cartItems: this.props.cartItems
        };
        this.props.createOrder(order);
        this.setState({ showCheckout: false });
    };
    toggleShowCheckout = () => {
        this.setState({ showCheckout: true });
    };
    cartItemsList() {
        const cartItems = this.props.cartItems;
        return cartItems.map((item, index) => {
            return (
                <>
                    <div>
                        <div className="cart">

                            <ul className="cart-items">
                                <Fade cascade left>
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
                                                <button
                                                    className="btn"
                                                    onClick={() => this.props.deleteItemFromCart(item)}>
                                                    Remove
                                        </button>
                                            </div>
                                        </div>
                                    </li>
                                </Fade>
                            </ul>

                        </div>
                        <div className="cart">
                            <div className="total">
                                {index === cartItems.length - 1 &&
                                    <div >
                                        Total:{" "} ${cartItems.reduce((prev, curr) => prev + (curr.price * curr.count), 0)}
                                        <button
                                            onClick={this.toggleShowCheckout}
                                            className="btn">
                                            Proceed
                                    </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
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
                {this.state.showCheckout && (
                    <div className="cart">
                        <form onSubmit={this.createOrder}>
                            <ul className="form-container">
                                <li>
                                    <label>Email</label>
                                    <input required
                                        type="email"
                                        name="email"
                                        onChange={this.handleInput} />
                                </li>
                                <li>

                                    <label>Name</label>
                                    <input required
                                        type="text"
                                        name="name"
                                        onChange={this.handleInput} />
                                </li>
                                <li>

                                    <label>Address</label>
                                    <input required
                                        type="text"
                                        name="address"
                                        onChange={this.handleInput} />
                                </li>
                                <li>
                                    <button class="btn" type="submit">
                                        Checkout
                                        </button>
                                </li>
                            </ul>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
