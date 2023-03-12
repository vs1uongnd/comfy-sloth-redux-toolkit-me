import React, { useEffect } from "react";
import Wrapper from "../../wrappers/CartContent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { clearCart } from "../../features/cart/cartSlice";
import { countCartTotals } from "../../features/cart/cartSlice";

const CartContent = () => {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countCartTotals());
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, dispatch]);
  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={() => dispatch(clearCart())}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};

export default CartContent;
