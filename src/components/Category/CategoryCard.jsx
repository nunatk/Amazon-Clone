import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

export default function CategoryCard({ title, displayName, image }) {
  const navigate = useNavigate();

  const goToCategory = () => {
    navigate(`/category/${encodeURIComponent(title)}`);
  };

  return (
    <div className="category-card" onClick={goToCategory}>
      <h3>{displayName}</h3>
      <img src={image} alt={displayName} className="category-img" />
      <p className="shop-link">Shop now</p>
    </div>
  );
}
