import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="green">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Chat
          </Link>
          {/* I'll Update it later */}
          {/* <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
