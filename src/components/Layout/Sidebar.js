import React from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { links } from "../../utils/constants";
import CartButtons from "./CartButtons";
import Wrapper from "../../wrappers/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../features/products/productsSlice";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const { user } = useAuth0();

  const { isSidebarOpen } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <aside className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
        <div className="sidebar-header">
          <img src={logo} alt="comfy sloth logo" className="logo" />
          <button
            className="close-btn"
            type="button"
            onClick={() => dispatch(closeSidebar())}
          >
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => (
            <li key={id} onClick={() => dispatch(closeSidebar())}>
              <Link to={url}>{text}</Link>
            </li>
          ))}
          {user && (
            <li onClick={() => dispatch(closeSidebar())}>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </aside>
    </Wrapper>
  );
};

export default Sidebar;
