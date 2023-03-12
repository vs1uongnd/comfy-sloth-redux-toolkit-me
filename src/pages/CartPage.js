import React from "react";
import Wrapper from "../wrappers/CartPage";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { cart } = useSelector((store) => store.cart);
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

export default CartPage;
