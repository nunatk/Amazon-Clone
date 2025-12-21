import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-left">
          <button className="nav-all" onClick={openMenu}>
            <FiMenu className="menu-icon" />
            <span>All</span>
          </button>

          <span className="nav-item">Today's Deals</span>
          <span className="nav-item">Customer Service</span>
          <span className="nav-item">Registry</span>
          <span className="nav-item">Gift Cards</span>
          <span className="nav-item">Sell</span>
        </div>
      </nav>

      {/* Side drawer menu */}
      {isMenuOpen && (
        <div className="side-overlay" onClick={closeMenu}>
          <div
            className="side-menu"
            onClick={(e) => e.stopPropagation()} // prevent close on inside click
          >
            <h3 className="side-title">All Departments</h3>
            <p className="side-link">Electronics</p>
            <p className="side-link">Computers</p>
            <p className="side-link">Books</p>
            <p className="side-link">Home & Kitchen</p>
            <p className="side-link">Fashion</p>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
