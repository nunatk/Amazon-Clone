import "./Category.css";
import CategoryCard from "./CategoryCard";

function Category() {
  const categories = [
    {
      displayName: "Electronics",
      category: "electronics",
      image: "https://m.media-amazon.com/images/I/61S0ZRxKJFL._AC_UL640_QL65_.jpg",
    },
    {
      displayName: "Discover fashion trends",
      category: "women's clothing", // mapped to real API category
      image: "https://images.squarespace-cdn.com/content/v1/60183f593487663a1acf95cf/89c07a2e-891e-4b60-97b7-5ef95f0bd4fb/12.png",
    },
    {
      displayName: "Men's Clothing",
      category: "men's clothing",
      image: "https://pngimg.com/uploads/man/man_PNG6532.png",
    },
    {
      displayName: "Jewelry",
      category: "jewelery", 
      image: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2025/LuxuryStores/Q1_HomepageAssets/Desktop_Quad_Card_VC_2._SY232_CB777803544_.jpg",
    },
  ];

  return (
    <section className="category-wrapper">
      {categories.map((cat, index) => (
        <CategoryCard
          key={index}
          title={cat.category}           // SENT TO ROUTER
          displayName={cat.displayName} // WHAT USER SEES
          image={cat.image}
        />
      ))}
    </section>
  );
}

export default Category;
