import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


  class Bar extends React.Component {


    render() {
      return (
        <div>
          <Navbar className="NavbarClass" expand="md">
            <NavbarBrand className="Brand" href="/">Marvel Character Finder</NavbarBrand>

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="NavLinkClass" href="/">Home</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="NavLinkClass" href="/favorites">Favorites</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="NavLinkClass" href="/login">Login</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="NavLinkClass" href="/register">Register</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
        </div>
      );
    }
  }


// class Navbar extends Component {
//   render() {
//     return (
//       <ul className="nav">
//
//         <li className="nav-item">
//           <Link to="/" className="nav-link">
//             HOME
//           </Link>
//         </li>
//
//         <li className="nav-item">
//           <Link to="/favorites/" className="nav-link">
//             FAVORITES
//           </Link>
//         </li>
//
//         <li className="nav-item">
//           <Link to="/login" className="nav-link">
//             LOGIN
//           </Link>
//         </li>
//
//         <li className="nav-item">
//           <Link to="/register" className="nav-link">
//             REGISTER
//           </Link>
//         </li>
//
//       </ul>
//     );
//   }
// }

export default Bar;
