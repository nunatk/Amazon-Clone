import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiSearch,
  FiChevronDown,
  FiShoppingCart
} from "react-icons/fi";

import { useCart } from "../CartProvider/CartProvider";
import { useAuth } from "../../components/Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../Utility/FireBase";

import amazonLogo from "../img/images.png";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { count } = useCart();
  const { user } = useAuth();

  const [showLang, setShowLang] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    navigate(`/products?search=${searchValue}`);
  };

  const handleAccountClick = () => {
    if (user) {
      signOut(auth);
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="header-wrapper">

      {/* LEFT */}
      <section className="header-left">
        <div
          className="header-logo"
          onClick={() => navigate("/")}
        >
          <img
            src={amazonLogo}
            alt="Amazon"
            className="amazon-logo"
          />
        </div>

        <div className="header-location">
          <FiMapPin className="location-icon" />
          <div>
            <p className="deliver-text">Deliver to</p>
            <p className="deliver-country">Ethiopia</p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="header-search">
        <select className="search-category">
          <option>All</option>
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="Search Product"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button className="search-button" onClick={handleSearch}>
          <FiSearch className="search-icon" />
        </button>
      </section>

      {/* RIGHT */}
      <section className="header-right">

        {/* LANGUAGE */}
        <div
          className="header-language"
          onClick={() => setShowLang((prev) => !prev)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            alt="USA"
            className="flag-icon"
          />

          <div className="lang-wrapper">
            <span className="lang-text">EN</span>
            <FiChevronDown />
          </div>

          {showLang && (
            <div className="lang-dropdown">
              <p>EN - English</p>
              <p>AM - Amharic</p>
              <p>ES - Spanish</p>
            </div>
          )}
        </div>

        {/* ACCOUNT */}
        <div
          className="header-option header-account"
          onClick={handleAccountClick}
        >
          <p className="option-line-one">
            Hello, {user?.displayName || "sign in"}
          </p>

          <p className="option-line-two">
            {user ? "Sign Out" : "Account & Lists"}{" "}
            <FiChevronDown className="small-chevron" />
          </p>
        </div>

        {/* ORDERS */}
        <div
          className="header-option"
          onClick={() => navigate("/orders")}
        >
          <p className="option-line-one">Returns</p>
          <p className="option-line-two">& Orders</p>
        </div>

        {/* CART */}
        <div
          className="header-cart"
          onClick={() => navigate("/cart")}
        >
          <FiShoppingCart className="cart-icon" />
          <span className="cart-count">{count}</span>
        </div>
      </section>
    </header>
  );
}

export default Header;
