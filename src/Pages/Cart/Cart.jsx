import React from "react";
import { useCart } from "../../components/CartProvider/CartProvider";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const subtotal = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  /* ================= CHECKOUT ================= */
  async function handleCheckout() {
    // redirect if not logged in
    if (!user) {
      navigate("/auth", { state: { from: "/cart" } });
      return;
    }

    try {
      const res = await fetch(`${API}/createCheckoutSession`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          items: cart,
        }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const data = await res.json();

      if (!data?.url) throw new Error("Stripe URL missing");

      // send user to Stripe
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  /* ================= UI ================= */
  return (
    <Layout>
      <div className="cart-page">
        <div className="cart-header">
          <h2>Hello</h2>
          <p>Your shopping basket</p>
          <hr />
        </div>

        <div className="cart-main">
          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE */}
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
