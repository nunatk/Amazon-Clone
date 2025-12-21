import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Orders.css";
import Loader from "../../components/Loader/Loader";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from FakeStoreAPI
  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("https://fakestoreapi.com/carts?limit=5");
        const carts = await response.json();

        // Enhance each cart with product details
        const ordersWithProducts = await Promise.all(
          carts.map(async (cart) => {
            const itemDetails = await Promise.all(
              cart.products.map(async (product) => {
                const productRes = await fetch(
                  `https://fakestoreapi.com/products/${product.productId}`
                );
                const productData = await productRes.json();

                return {
                  ...productData,
                  quantity: product.quantity
                };
              })
            );

            return {
              id: cart.id,
              date: cart.date,
              products: itemDetails
            };
          })
        );

        setOrders(ordersWithProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <Layout>
        <button className="back-btn" onClick={() => navigate(-1)}>
         Back
      </button>
        <div className="orders-wrapper">
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="orders-wrapper">
        <h1 className="orders-title">Your Orders</h1>
        <p className="orders-sub">Below are your recent orders</p>

        {orders.length === 0 && (
          <div className="no-orders-box">
            <h2>No orders found</h2>
            <p>Once you place an order, it will appear here.</p>
          </div>
        )}

        {/* Loop through orders */}
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3 className="order-id">Order #{order.id}</h3>
            <p className="order-date">
              Placed on: {new Date(order.date).toDateString()}
            </p>

            <div className="order-items">
              {order.products.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.title} className="item-img" />

                  <div>
                    <p className="item-title">{item.title}</p>
                    <p className="item-qty">Quantity: {item.quantity}</p>
                    <p className="item-price">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="order-total">
              Total: $
              {order.products
                .reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
