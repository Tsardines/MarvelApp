import React, { Component } from "react";
import CharacterListItem from "../CharacterListItem";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";

class CharacterList extends Component {
  render() {
    let { characters } = this.props;
    let characterItems = characters.map(character => (
      <Link to={`/character/${character.id}`}>
        <CharacterListItem
          characterData={character}
          key={character.id}
        />
      </Link>
    ));

    return (
      <div className="character-list-container">
        <h1>CHARACTER LIST</h1>
        <div className="character-cell-container">
          <ul>{characterItems}</ul>
        </div>
      </div>
    );
  }
}

export default CharacterList;
