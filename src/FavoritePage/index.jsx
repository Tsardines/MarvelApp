import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CharacterDetail from "../CharacterDetail";
import FavoriteList from "../FavoriteList";
import "isomorphic-fetch";
import "./style.css";

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteCharacters: [],
      favoritesLoaded: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchFavorites = this.fetchFavorites.bind(this);
  }
  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites() {
    fetch(`/favorites/1`)
      .then(response => response.json())
      .then(charactersAsJson => {
        let favorites = charactersAsJson
        // console.log(favorites)
        this.setState({
          favoriteCharacters: favorites,
          favoritesLoaded: true
        });
      })
    }

  render() {
    if (!this.state.favoritesLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <Router>
        <div className="favorite-page">
          <FavoriteList
            favoriteCharacters={this.state.favoriteCharacters}
          />
        </div>
      </Router>
    );
  }
}

export default FavoritePage;
