import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../components/CartProvider/CartProvider";
import Loader from "../../components/Loader/Loader";
import Layout from "../../components/Layout/Layout";

// MUI icons for product rating
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import "./SingleProduct.css";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Holds the product returned from the API
  const [product, setProduct] = useState(null);

  // Controls loading state while fetching data
  const [loading, setLoading] = useState(true);

  // Quantity makes sense for electronics (instead of sizes)
  const [quantity, setQuantity] = useState(1);

  // Fetch the selected product when the page loads or id changes
  useEffect(() => {
    setLoading(true);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  // Show loader while data is loading
  if (loading) return <Loader />;

  // Safety check if product is missing
  if (!product) return null;

  // Round rating for star display
  const rating = Math.round(product.rating?.rate || 0);

  return (
    <Layout>
      <div className="single-product-page">

        {/* Takes the user back to the previous page */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>

        <section className="sp-wrapper">

          {/* Left side: product image */}
          <div className="sp-left">
            <img
              src={product.image}
              alt={product.title}
              className="sp-main-img"
            />
          </div>

          {/* Right side: product details */}
          <div className="sp-info">

            {/* Product title */}
            <h1 className="sp-title">{product.title}</h1>

            {/* Product rating using MUI stars */}
            <div className="sp-rating">
              {Array.from({ length: 5 }).map((_, index) =>
                index < rating ? (
                  <StarIcon key={index} className="star filled" />
                ) : (
                  <StarBorderIcon key={index} className="star empty" />
                )
              )}
              <span className="rating-count">
                {product.rating?.count} ratings
              </span>
            </div>

            {/* Product price */}
            <p className="sp-price">${product.price}</p>

            {/* Short purchase reassurance */}
            <p className="sp-short-desc">
              Free delivery. Free returns within 30 days.
            </p>

            {/* Quantity selector (electronics-friendly) */}
            <div className="sp-quantity-box">
              <p className="quantity-title">Quantity</p>

              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="quantity-select"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Long description */}
            <div className="sp-description-box">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>

            {/* Add to cart button */}
            <button
              className="sp-add-btn"
              onClick={() => {
                addToCart({
                  ...product,
                  quantity,
                });
              }}
            >
              Add to Cart
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
