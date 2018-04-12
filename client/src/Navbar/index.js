import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";

class Navbar extends Component {
  render() {
    return (
      <ul className="nav">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            HOME
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/favorites/" className="nav-link">
            FAVORITES
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            LOGIN
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            REGISTER
          </Link>
        </li>

      </ul>
    );
  }
}

export default Navbar;
