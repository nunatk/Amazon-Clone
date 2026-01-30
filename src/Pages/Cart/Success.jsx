import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/"); // Goes to /Amazon-Clone/
  }

  return (
    <Layout>
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Thank you. Your order has been placed.</h2>

        <p style={{ marginTop: "15px" }}>
          Payment Status: <strong>Successful</strong>
        </p>

        <p style={{ marginTop: "10px" }}>
          A confirmation email will be sent to you shortly.
        </p>

        <button
          onClick={goHome}
          style={{ marginTop: "30px", padding: "10px 20px" }}
        >
          Continue Shopping
        </button>
      </div>
    </Layout>
  );
}
