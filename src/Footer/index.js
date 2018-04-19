import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";

class Footer extends Component {
  render() {
    return (
      <ul className="footer">

        <div className="footer-block">
        <li className="footer-item">
          <Link to="/" className="footer-link">
            Home
          </Link>
        </li>

        <li className="footer-item">
          <Link to="/favorites/" className="footer-link">
            Favorites
          </Link>
        </li>

        <li className="footer-item">
          <Link to="/login" className="footer-link">
            Login
          </Link>
        </li>

        <li className="footer-item">
          <Link to="/register" className="footer-link">
            Register
          </Link>
        </li>


      </div>
      </ul>
    );
  }
}

export default Footer;
