import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import OrderDetail from "./Pages/Orders/OrderDetail";
import Cart from "./Pages/Cart/Cart";
import SingleProduct from "./Pages/ProductDetail/SingleProduct";
import Results from "./Pages/Results/Results";
import Success from "./Pages/Cart/Success";
import Cancel from "./Pages/Cart/Cancel";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/payments" element={<Payment />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/category/:category" element={<Results />} />

      {/* Stripe Redirect Pages */}
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  );
}

export default Routing;
