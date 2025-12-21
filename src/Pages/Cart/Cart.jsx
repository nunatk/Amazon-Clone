import React from "react";
import { useCart } from "../../components/CartProvider/CartProvider";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import "./Cart.css";
import Layout from "../../components/Layout/Layout";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  // Calculate subtotal
  const subtotal = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Layout>
      <div className="cart-page">

        {/* HEADER */}
        <div className="cart-header">
          <h2>Hello</h2>
          <p>Your shopping basket</p>
          <hr className="cart-header-divider" />
        </div>

        <div className="cart-main">

          {/* LEFT SIDE — CART ITEMS */}
          <div className="cart-left">

            {cart.length === 0 && (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
              </div>
            )}

            {cart.map((item) => (
              <div className="cart-item" key={item.id}>

                {/* PRODUCT IMAGE */}
                <img src={item.image} alt={item.title} className="cart-img" />

                {/* PRODUCT DETAILS */}
                <div className="cart-details">
                  <h3 className="cart-item-title">{item.title}</h3>

                  <p className="cart-description">
                    Satisfaction Guaranteed. Return or exchange any order within 30 days.
                  </p>

                  {/* STAR RATING */}
                  <div className="cart-stars">
                    {"★".repeat(Math.round(item.rating?.rate || 4))}
                    {"☆".repeat(5 - Math.round(item.rating?.rate || 4))}
                    <span className="cart-count">{item.rating?.count || 70}</span>
                  </div>

                  {/* PRICE */}
                  <p className="cart-price">${item.price}</p>

                  {/* SIZE */}
                  {item.size && <p className="cart-size">Size: {item.size}</p>}

                  {/* REMOVE ITEM */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                {/* RIGHT SIDE — QUANTITY CONTROLS */}
                <div className="qty-controls-right">

                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(item.id)}
                  >
                    <FaAngleUp className="qty-icon" />
                  </button>

                  <span className="qty-number">{item.quantity}</span>
                  
                   <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item.id)}
                  >
                    <FaAngleDown className="qty-icon" />
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* RIGHT SIDE — SUMMARY BOX */}
          {cart.length > 0 && (
            <div className="cart-summary">
              <h3>Subtotal ({cart.length} items)</h3>
              <p className="subtotal-amount">${subtotal}</p>

              <label className="gift-option">
                <input type="checkbox" /> This order contains a gift
              </label>

              <button className="checkout-btn">
                Continue to checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
