import React from "react";
import Wrapper from "../../wrappers/Navbar";
import logo from "../../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../../utils/constants";
import CartButtons from "./CartButtons";
import { openSidebar } from "../../features/products/productsSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

const Nav = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="comfy sloth logo" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => dispatch(openSidebar())}
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
          {user && (
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </div>
    </Wrapper>
  );
};

export default Nav;
