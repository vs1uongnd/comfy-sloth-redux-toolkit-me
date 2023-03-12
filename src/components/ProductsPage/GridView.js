import React from "react";
import Product from "../Product";
import Wrapper from "../../wrappers/GridView";

const GridView = ({ products }) => {
  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </Wrapper>
  );
};

export default GridView;
