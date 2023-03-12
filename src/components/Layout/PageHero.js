import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../wrappers/PageHero";

const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {product && <Link to="/products">/ Products</Link>} / {title}
        </h3>
      </div>
    </Wrapper>
  );
};

export default PageHero;
