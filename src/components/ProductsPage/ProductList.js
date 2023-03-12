import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";
import Loading from "../Layout/Loading";
import Error from "../Layout/Error";

import { loadProducts } from "../../features/filter/filterSlice";
import { getFeaturedProducts } from "../../features/products/productsSlice";

const ProductList = () => {
  const { products, products_loading, products_error } = useSelector(
    (store) => store.products
  );
  const dispatch = useDispatch();
  const { filtered_products, grid_view } = useSelector((store) => store.filter);

  // FIXME: logic useEffect & filtered_products.length < 1
  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length < 1) return;
    dispatch(loadProducts(products));
  }, [products, dispatch]);

  if (products_loading) return <Loading />;
  if (products_error)
    return <Error message="An error occurred while loading products" />;
  if (
    products.length === 0 ||
    (products.length > 0 && filtered_products.length < 1)
  )
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search
      </h5>
    );
  if (!grid_view) return <ListView products={filtered_products} />;
  return <GridView products={filtered_products} />;
};

export default ProductList;
