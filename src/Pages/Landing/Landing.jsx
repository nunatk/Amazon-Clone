import useProducts from "../../hooks/useProducts";
import Products from "../../components/Product/Products";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import NavBar from "../../components/NavBar/NavBar"
import CarouselEffect from "../../components/Carousel/CarouselEffect"
import Category from "../../components/Category/Category";

function Landing() {
  const { products, loading } = useProducts();

  return (
    <Layout>
      <NavBar />
      <CarouselEffect />
      <Category />

      {loading ? <Loader /> : <Products products={products} />}
    </Layout>
  );
}

export default Landing;
