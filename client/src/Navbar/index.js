import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";

// home favorites login signup

class Navbar extends Component {
  render() {
    return (
      <ul className="nav">

        <li className="nav-item">
          <h1 className="site-logo">Marvel App</h1>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/favorites/" className="nav-link">
            Favorites
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign Up
          </Link>
        </li>

      </ul>
    );
  }
}

export default Navbar;
