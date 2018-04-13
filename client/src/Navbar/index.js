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
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="dark" expand="md">
            <NavbarBrand href="/">Marvel Character Finder</NavbarBrand>

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/favorites">Favorites</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/register">Register</NavLink>
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
