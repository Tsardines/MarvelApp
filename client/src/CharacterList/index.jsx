import React, { Component } from "react";
import CharacterListItem from "../CharacterListItem";
import CharacterListFilter from "../CharacterListFilter";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";

class CharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCharacterArray: this.props.characters,
      filterText: ""
    };
    this.handleFilterText = this.handleFilterText.bind(this);
  }

  handleFilterText(evt) {
    // const filterValue = evt.target.value;
    const filteredCharacters = this.props.characters.filter(character =>
      character.name
        .toLocaleLowerCase()
        .includes(evt.target.value.toLocaleLowerCase())
    );
    console.log(filteredCharacters);
    this.setState({
      filterText: evt.target.value,
      filteredCharacterArray: filteredCharacters
    });
  }

  render() {
    if (!this.state.filteredCharacterArray) {
      return <p>Loading</p>;
    }
    let characters = this.state.filteredCharacterArray;
    let characterItems = characters.map(character => (
      <Link to={`/character/${character.id}`}>
        <CharacterListItem characterData={character} key={character.id} />
      </Link>
    ));

    return (
      <div className="character-list-container">
        <h3>CHARACTER LIST</h3>
        <div className="filter-bar">
          <CharacterListFilter
            // characterData={characterItems}
            onChange={this.handleFilterText}
            filterText={this.state.filterText}
          />
        </div>
        <div className="character-cell-container">
          <ul>{characterItems}</ul>
        </div>
      </div>
    );
  }
}

export default CharacterList;
