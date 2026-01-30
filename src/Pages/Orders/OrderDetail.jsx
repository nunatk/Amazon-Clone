import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useAuth } from "../../components/Context/AuthContext";
import Layout from "../../components/Layout/Layout";
import "../Orders/Orders.css";

export default function OrderDetail() {
  const { orderId } = useParams();
  const { user, authLoading } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        const ref = doc(db, "users", user.uid, "orders", orderId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setOrder(snap.data());
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setLoading(false);
      }
    }

    fetchOrder();
  }, [authLoading, user, orderId]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: "30px" }}>
          <p>Loading order…</p>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div style={{ padding: "30px" }}>
          <p>Order not found.</p>
        </div>
      </Layout>
    );
  }

  /* ================= UI ================= */

  return (
    <Layout>
      <div className="orders-page">
        <h2>Order details</h2>

        <div className="order-card">
          <div className="order-header">
            <div>
              <span>ORDER ID</span>
              <p>{orderId}</p>
            </div>

            <div>
              <span>TOTAL</span>
              <p>${order.amount}</p>
            </div>

            <div>
              <span>STATUS</span>
              <p>{order.payment_status}</p>
            </div>
          </div>

          <div className="order-body">
            {order.items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="order-item-info">
                  <p className="title">{item.title}</p>
                  <p>Qty: {item.quantity}</p>

                  <p>
                    Return status:{" "}
                    {item.return_status || "not returned"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
