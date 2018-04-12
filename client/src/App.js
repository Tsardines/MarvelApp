import React, { Component } from "react";

import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import "./App.css";
import FavoriteCharacter from "./FavoriteCharacter";
import MarvelCharacter from "./MarvelCharacter";
import User from "./User";
// import MarvelData from "./Models/MarvelData";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />

          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
