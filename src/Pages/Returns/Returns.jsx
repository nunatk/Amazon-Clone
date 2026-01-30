import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";

export default function Returns() {
  const { user, authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchReturns() {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "orders")
      );

      const returned = snapshot.docs.flatMap(doc =>
        doc.data().items.filter(
          item => item.return_status === "requested"
        )
      );

      setItems(returned);
      setLoading(false);
    }

    fetchReturns();
  }, [user, authLoading]);

  if (loading) {
    return (
      <Layout>
        <p style={{ padding: "30px" }}>Loading returns…</p>
      </Layout>
    );
  }

  if (!items.length) {
    return (
      <Layout>
        <p style={{ padding: "30px" }}>No returns yet.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="orders-page">
        <h2>Returns</h2>

        {items.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.title} />
            <div>
              <p className="title">{item.title}</p>
              <p>Qty: {item.quantity}</p>
              <p>Status: Return requested</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
