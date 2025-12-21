// Bringing in React and the useState hook so I can manage state inside this component
import React, { useState } from "react";

// Importing icons from react-icons (these are SVG icons that I can use like React components)
import {
  FiMapPin,
  FiSearch,
  FiChevronDown,
  FiShoppingCart
} from "react-icons/fi";

// Hook for navigating between pages without reloading the browser
import { useNavigate } from "react-router-dom";

// Pulling the cart state from my CartProvider so I can show how many items are in the cart
import { useCart } from "../CartProvider/CartProvider";
import amazonLogo from "../img/images.png";
import "./Header.css";

function Header() {

  // This gives me access to the navigate function so I can move to different pages
  const navigate = useNavigate();

  // Count represents how many items are currently in the cart
  const { count } = useCart();

  // State for toggling the language dropdown open and closed
  const [showLang, setShowLang] = useState(false);

  // State for storing whatever the user types in the search input
  const [searchValue, setSearchValue] = useState("");

  // When the user clicks the search button or hits Enter
  const handleSearch = () => {
    // If the search bar is empty, I don’t want to run a search
    if (!searchValue.trim()) return;

    // Navigate to the products page with the search query added to the URL
    navigate(`/products?search=${searchValue}`);
  };

  return (
    <header className="header-wrapper">

      {/* LEFT SIDE OF THE HEADER */}
      <section className="header-left">

        {/* Clicking the logo brings the user back to the homepage */}
       <div
  className="header-logo"
  onClick={() => navigate("/")}
  style={{ cursor: "pointer" }}
>
  <img
    src={amazonLogo}
    alt="Amazon"
    className="amazon-logo"
  />
</div>


        {/* Location section (this is similar to Amazon’s “Deliver to” area) */}
        <div className="header-location">
          <FiMapPin className="location-icon" />
          <div>
            <p className="deliver-text">Deliver to</p>
            <p className="deliver-country">Ethiopia</p>
          </div>
        </div>
      </section>

      {/* MIDDLE SEARCH BAR */}
      <section className="header-search">

        {/* Category dropdown – for now it only shows “All” */}
        <select className="search-category">
          <option value="">All</option>
        </select>

        {/* Search input where the user types in their product name */}
        <input
          type="text"
          className="search-input"
          placeholder="Search Product"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} // updating state as user types
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // allow Enter key search
        />

        {/* Magnifying glass search button */}
        <button className="search-button" onClick={handleSearch}>
          <FiSearch className="search-icon" />
        </button>
      </section>

      {/* RIGHT SIDE OF THE HEADER */}
      <section className="header-right">

        {/* LANGUAGE MENU */}
        <div
          className="header-language"
          onClick={() => setShowLang((prev) => !prev)} // opens/closes language dropdown
        >
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2477519645/display_1500/stock-vector-american-flag-usa-design-united-states-flag-rendered-usa-flag-the-usa-national-flag-2477519645.jpg"
            className="flag-icon"
          />

          <div className="lang-wrapper">
            <span className="lang-text">EN</span>
            <FiChevronDown className="dropdown-icon" />
          </div>

          {/* Show language options only when showLang is true */}
          {showLang && (
            <div className="lang-dropdown">
              <p>EN - English</p>
              <p>AM - Amharic</p>
              <p>ES - Spanish</p>
            </div>
          )}
        </div>

        {/* ACCOUNT SECTION */}
        <div
          className="header-option header-account"
          onClick={() => navigate("/auth")} // takes user to sign-in page
          style={{ cursor: "pointer" }}
        >
          <p className="option-line-one">Hello, sign in</p>

          <p className="option-line-two">
            Account & Lists <FiChevronDown className="small-chevron" />
          </p>

          {/* Dropdown that appears on hover (handled by CSS) */}
          <div className="account-dropdown">
            <button className="dropdown-signin-btn">Sign in</button>

            {/* <p className="dropdown-title">Your lists</p>
            <p className="dropdown-item">Create a List</p> */}

            <p className="dropdown-title">Your account</p>
            <p className="dropdown-item">Your Orders</p>
            <p className="dropdown-item">Your Recommendations</p>
          </div>
        </div>

        {/* ORDERS BUTTON */}
        <div
          className="header-option"
          onClick={() => navigate("/orders")}
          style={{ cursor: "pointer" }}
        >
          <p className="option-line-one">Returns</p>
          <p className="option-line-two">& Orders</p>
        </div>

        {/* CART BUTTON */}
        <div
          className="header-cart"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        >
          <FiShoppingCart className="cart-icon" />

          {/* Showing how many items are inside the cart */}
          <span className="cart-count">{count}</span>
        </div>
      </section>
    </header>
  );
}

export default Header;
