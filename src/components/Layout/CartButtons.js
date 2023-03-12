import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../../wrappers/CartButtons";
import { removeLocalStorage } from "../../features/cart/cartSlice";

const CartButtons = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const { total_items } = useSelector((store) => store.cart);

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn">
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>
      {user ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            removeLocalStorage();
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  );
};

export default CartButtons;
