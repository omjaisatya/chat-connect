import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>Chat Connect</h5>
            <p>
              Connect and chat with your friends instantly. This is a dummy
              application for learning purposes.
            </p>
          </div>
          <div className="col-md-6 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/"} className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/signup"} className="text-white">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to={"/logout"} className="text-white">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>
            &copy; {new Date().getFullYear()} Chat Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
