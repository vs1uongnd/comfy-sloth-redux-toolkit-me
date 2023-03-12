import React, { useState } from "react";
import Wrapper from "../../wrappers/AddToCart";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import AmountButtons from "../AmountButtons";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const AddToCart = ({ product }) => {
  const { id, stock, colors } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const { loginWithRedirect, user } = useAuth0();

  const dispatch = useDispatch();
  const increase = () => {
    setAmount((oldAmount) => {
      let temp = oldAmount < stock ? oldAmount + 1 : stock;
      return temp;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let temp = oldAmount > 1 ? oldAmount - 1 : 1;
      return temp;
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`}
                style={{ background: color }}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <div>
          <Link
            to="/cart"
            className={`${user ? "btn" : "btn disabled"}`}
            onClick={() => {
              dispatch(addToCart({ id, color: mainColor, amount, product }));
            }}
            type="button"
          >
            add to cart
          </Link>
          {!user && (
            <Link
              className="btn btn-log-in"
              onClick={loginWithRedirect}
              type="button"
            >
              log in
            </Link>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default AddToCart;
