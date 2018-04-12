import React, { Component } from "react";
import CharacterListItem from "../CharacterListItem"
import "./style.css";

class CharacterList extends Component {
  render() {

    let {characters} = this.props;
    let characterItems = characters.map(character => (
      <CharacterListItem characterData={character} key={character.name}/>
    ))

    return (
      <div className="character-list-container">
        <h1>CHARACTER LIST</h1>
        <div  className="character-cell-container">
          <ul>
            {characterItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default CharacterList;
