import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <Layout>
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Payment Cancelled</h2>
        <p>Your payment was not completed.</p>

        <Link to="/cart">
          <button style={{ marginTop: "30px", padding: "10px 20px" }}>
            Return to Cart
          </button>
        </Link>
      </div>
    </Layout>
  );
}
