import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./Orders.css";

export default function Orders() {
  const { user, authLoading } = useAuth(); // 👈 important
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return; // wait for auth

    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      const q = query(
        collection(db, "users", user.uid, "orders"),
        orderBy("created", "desc")
      );

      const snapshot = await getDocs(q);

      setOrders(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      setLoading(false);
    }

    fetchOrders();
  }, [user, authLoading]);

  if (loading) {
    return (
      <Layout>
        <p style={{ padding: "30px" }}>Loading orders…</p>
      </Layout>
    );
  }

  if (!orders.length) {
    return (
      <Layout>
        <p style={{ padding: "30px" }}>No orders yet.</p>
      </Layout>
    );
  }

  async function requestReturn(orderId, itemId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const ref = doc(db, "users", user.uid, "orders", orderId);

    await updateDoc(ref, {
      items: order.items.map(item =>
        item.id === itemId
          ? { ...item, return_status: "requested" }
          : item
      ),
    });

    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              items: o.items.map(i =>
                i.id === itemId
                  ? { ...i, return_status: "requested" }
                  : i
              ),
            }
          : o
      )
    );
  }

  return (
    <Layout>
      <div className="orders-page">
        <h2>Orders & Returns</h2>

        {orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <div>
                <span>ORDER PLACED</span>
                <p>{order.created?.toDate().toDateString()}</p>
              </div>

              <div>
                <span>TOTAL</span>
                <p>${order.amount}</p>
              </div>

              <div className="order-id">
                <span>ORDER #</span>
                <p>{order.id}</p>
              </div>
            </div>

            <div className="order-body">
              {order.items.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.title} />

                  <div className="order-item-info">
                    <p className="title">{item.title}</p>
                    <p>Qty: {item.quantity}</p>

                    {item.return_status === "requested" && (
                      <p style={{ color: "green" }}>Return requested</p>
                    )}

                    <div className="order-actions">
                      <button onClick={() => navigate(`/orders/${order.id}`)}>
                        View order
                      </button>

                      {item.return_status !== "requested" && (
                        <button
                          className="secondary"
                          onClick={() =>
                            requestReturn(order.id, item.id)
                          }
                        >
                          Return or replace
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
