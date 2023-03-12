import React from "react";
import Wrapper from "../wrappers/CheckoutPage";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const { cart } = useSelector((store) => store.cart);
  return (
    <main>
      <PageHero title="Checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
export default CheckoutPage;
