import React, { useEffect } from "react";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import Wrapper from "../wrappers/SingleProduct";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        {loading && <Loading />}
        {!loading && error && <Error />}
        {!loading && !error && (
          <div className="product-center">
            <ProductImages images={images} />
            <section className="content">
              <h2>{name}</h2>
              <Stars stars={stars} reviews={reviews} />
              <h5 className="price">{formatPrice(price)}</h5>
              <p className="desc">{description}</p>
              <p className="info">
                <span>Available : </span>
                {stock > 0 ? "In stock" : "out of stock"}
              </p>
              <p className="info">
                <span>SKU : </span>
                {sku}
              </p>
              <p className="info">
                <span>Brand : </span>
                {company}
              </p>
              <hr />
              {stock > 0 && <AddToCart product={product} />}
            </section>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default SingleProductPage;
