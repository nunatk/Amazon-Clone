import React from "react";
import { useCart } from "../../components/CartProvider/CartProvider";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../components/Context/AuthContext";
import "./Cart.css";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const { user } = useAuth();

  const subtotal = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  async function handleCheckout() {
    if (!user) {
      alert("Please log in to continue");
      return;
    }

    try {
      const res = await fetch(
        "https://us-central1-clone-6d071.cloudfunctions.net/api/createCheckoutSession",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.uid,
            items: cart,
          }),
        }
      );

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.log("Checkout failed:", err);
    }
  }

  return (
    <Layout>
      <div className="cart-page">
        <div className="cart-header">
          <h2>Hello</h2>
          <p>Your shopping basket</p>
          <hr />
        </div>

        <div className="cart-main">
          <div className="cart-left">
            {cart.length === 0 && (
              <p className="cart-empty">Your cart is empty.</p>
            )}

            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} className="cart-img" />

                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p className="cart-description">
                    Satisfaction Guaranteed. Return within 30 days.
                  </p>

                  <div className="cart-stars">
                    {"★".repeat(Math.round(item.rating?.rate || 4))}
                    {"☆".repeat(5 - Math.round(item.rating?.rate || 4))}
                    <span>{item.rating?.count || 70}</span>
                  </div>

                  <p className="cart-price">${item.price}</p>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="qty-controls-right">
                  <button onClick={() => increaseQty(item.id)}>
                    <FaAngleUp />
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => decreaseQty(item.id)}>
                    <FaAngleDown />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="cart-summary">
              <h3>Subtotal ({cart.length} items)</h3>
              <p>${subtotal}</p>

              <label>
                <input type="checkbox" /> This order contains a gift
              </label>

              <button className="checkout-btn" onClick={handleCheckout}>
                Continue to checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
