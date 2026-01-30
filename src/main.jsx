import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./components/CartProvider/CartProvider.jsx";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter >
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
