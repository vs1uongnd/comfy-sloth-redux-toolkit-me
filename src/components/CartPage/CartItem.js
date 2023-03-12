import React from "react";
import Wrapper from "../../wrappers/CartItem";
import { formatPrice } from "../../utils/helpers";
import AmountButtons from "../AmountButtons";
import { FaTrash } from "react-icons/fa";
import { removeItem, toggleAmount } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
const CartItem = ({ id, image, name, color, price, amount }) => {
  const dispatch = useDispatch();
  const increase = (id) => {
    dispatch(toggleAmount({ id, type: "inc" }));
  };
  const decrease = (id) => {
    dispatch(toggleAmount({ id, type: "dec" }));
  };
  return (
    <Wrapper>
      <div className="title">
        <img src={image} alt={name} />
        <div>
          <h5 className="name">{name}</h5>
          <p className="color">
            color : <span style={{ background: color }}></span>
          </p>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <AmountButtons
        amount={amount}
        increase={() => increase(id)}
        decrease={() => decrease(id)}
      />
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={() => dispatch(removeItem(id))}
      >
        <FaTrash />
      </button>
    </Wrapper>
  );
};

export default CartItem;
