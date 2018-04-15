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

  componentDidUpdate() {
    if (this.props.characters != this.state.filteredCharacterArray) {
      this.setState({
        filteredCharacterArray: this.props.characters
      })
    }
  }

  handleFilterText(evt) {
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

  handleScroll(evt) {
    //Got this idea from https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js
    let {scrollTop, scrollHeight, clientHeight} = evt.target;
    console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);
    if (scrollTop >= Math.floor(scrollHeight - clientHeight - 1)) {
      // alert(`scrollHeight: ${scrollHeight}`);
      this.props.onScroll(scrollTop, scrollHeight);
    }
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
            onChange={this.handleFilterText}
            filterText={this.state.filterText}
          />
        </div>
        <div className="character-cell-container">
          <ul onScroll={(e) => this.handleScroll(e)}>
            {characterItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default CharacterList;
