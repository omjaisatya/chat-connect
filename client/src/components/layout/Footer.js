import React from "react";

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
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="text-white">
                  Sign Up
                </a>
              </li>
              <li>
                <a href="/logout" className="text-white">
                  Logout
                </a>
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
