import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import Products from "../../components/Product/Products";
import Loader from "../../components/Loader/Loader";
import Layout from "../../components/Layout/Layout";

export default function Results() {
  const { category } = useParams();
  const { products, loading } = useProducts();

  const filteredProducts = products.filter(
    (item) =>
      item.category.toLowerCase() === category.toLowerCase()
  );

  if (loading) return <Loader />;

  return (
    <Layout>
      <Products products={filteredProducts} />
    </Layout>
  );
}
