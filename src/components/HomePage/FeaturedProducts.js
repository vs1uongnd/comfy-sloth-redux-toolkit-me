import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Error from "../Layout/Error";
import Loading from "../Layout/Loading";
import Product from "../Product";
import Wrapper from "../../wrappers/FeaturedProducts";
import { getFeaturedProducts } from "../../features/products/productsSlice";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  const { products_loading, products_error, featured_products } = useSelector(
    (store) => store.products
  );

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {products_loading && <Loading />}
        {!products_loading && products_error && (
          <Error message={products_error} />
        )}
        {!products_loading &&
          !products_error &&
          featured_products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

export default FeaturedProducts;
