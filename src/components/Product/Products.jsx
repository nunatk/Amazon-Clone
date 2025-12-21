import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartProvider/CartProvider";

// MUI Icons
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import "./Products.css";

export default function Products({ products }) {
  const { addToCart } = useCart();

  return (
    <section className="products-wrapper">
      {products.map((item) => {
        const rating = Math.round(item.rating?.rate || 0);

        return (
          <div className="product-card" key={item.id}>
            <Link to={`/product/${item.id}`} className="product-link">
              <img src={item.image} alt={item.title} className="product-img" />

              <h3 className="product-title">{item.title}</h3>

              {/* RATING */}
              <div className="product-rating">
                {Array.from({ length: 5 }).map((_, index) =>
                  index < rating ? (
                    <StarIcon key={index} className="star filled" />
                  ) : (
                    <StarBorderIcon key={index} className="star empty" />
                  )
                )}
                <span className="rating-count">
                  ({item.rating?.count})
                </span>
              </div>

              <p className="product-price">${item.price}</p>
            </Link>

            <button
              className="add-to-cart"
              onClick={() =>
                addToCart({ ...item, size: "Default" })
              }
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </section>
  );
}
