import React, { Component } from "react";
import FavoriteListItem from "../FavoriteListItem";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";

class FavoriteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesArray: []
    };
    this.getCharacterInfo = this.getCharacterInfo.bind(this);
  }
componentDidMount() {
  let marvelIds = this.props.favoriteCharacters.map(character => {
    return character.character_id
  })
  marvelIds.forEach(id => {
    console.log(this.getCharacterInfo(id))
  })
  // this.setState({
  //   favoriteCharactersIds: marvelIds
  // })
}

getCharacterInfo(character_id) {
  fetch(`http://localhost:4567/marvel_character/${character_id}`)
  .then(response => response.json()
  .then(characterAsJSON => {
    let updatedFavoritesArray = this.state.favoritesArray.slice()
    updatedFavoritesArray.push(characterAsJSON)
    this.setState({
      favoritesArray: updatedFavoritesArray
    })
  })
)
}
  render() {
    if (!this.state.favoritesArray) {
      return <p>Loading Favorite List...</p>;
    }
    let favorites = this.state.favoritesArray;
    let favoriteItems = favorites.map(favorite => (
      <Link to={`/character/${favorite.id}`}>
        <FavoriteListItem favoriteData={favorite} key={favorite.id} />
      </Link>
    ));

    return (
      <div className="favorite-list-container">
        <h3>FAVORITES LIST</h3>
        {/* <div className="character-cell-container">
          <ul>
            {this.favoriteItems}
          </ul>
        </div> */}
      </div>
    );
  }
}

export default FavoriteList;
