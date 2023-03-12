import React from "react";
import { Filters, ProductList, Sort, PageHero } from "../components";
import Wrapper from "../wrappers/ProductsPage";

const ProductsPage = () => {
  return (
    <main>
      <PageHero title="products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default ProductsPage;
