import React from "react";
import Wrapper from "../../wrappers/CartTotals";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartTotals = () => {
  const { total_amount, shipping_fee } = useSelector((store) => store.cart);

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(total_amount)}</span>
          </h5>
          <p>
            shipping fee : <span>{formatPrice(shipping_fee)}</span>
          </p>
          <hr />
          <h4>
            order total :{" "}
            <span>{formatPrice(total_amount + shipping_fee)}</span>
          </h4>
        </article>

        <Link to="/checkout" className="btn">
          proceed to checkout
        </Link>
      </div>
    </Wrapper>
  );
};

export default CartTotals;
