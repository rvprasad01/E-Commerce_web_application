// Footer.js

import React from "react";
import { Link } from "react-router-dom";
// import './footer.css'

function Footer() {
  return (
    <section className="section footer bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h6>Company Information</h6>
            <hr />
            <p>
              agasgwrgsdi oihfofinwoivu i oajsoijawoi aojdvvij
            </p>
          </div>
          <div className="col-md-4">
            <h6>Quick Links</h6>
            <hr />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/order">Order</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Contact Information</h6>
            <hr />
            <p className="fst-normal">Text with normal font style</p>
            <p className="fst-normal">Text with normal font style</p>
            <p className="fst-normal">Text with normal font style</p>
            <p className="fst-normal">Text with normal font style</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
