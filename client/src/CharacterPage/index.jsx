import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CharacterList from "../CharacterList";
import CharacterDetail from "../CharacterDetail";
import CharacterListFilter from "../CharacterListFilter";
import "./style.css";

class CharacterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      charactersLoaded: false,
      offset: 0,
      scrollHeightTripped: 0
    };
    this.fetchCharacters = this.fetchCharacters.bind(this);
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.offset !== this.state.offset) {
      this.fetchCharacters();
    }
  }


  fetchCharacters() {
    let offset = this.state.offset
    fetch(`http://localhost:4567/api/characters/${offset}`)
      .then(response => response.json())
      .then(charactersAsJson => {
        let characters = charactersAsJson.data.results;
        let charactersWithDescriptionsAndImages = characters.filter(character => {
          return (character.description.length > 0 && !character.thumbnail.path.includes('image_not_available'));
        });
        let updatedCharacters = this.state.characters.concat(charactersWithDescriptionsAndImages);
        // console.log(updatedCharacters);
        this.setState({
          characters: updatedCharacters,
          charactersLoaded: true
        });
      });
  }

  handleScroll(currentScrollTop, currentScrollHeight) {
    console.log(`handleScroll was called! at currentScrollHeight ${currentScrollHeight}`)
    if (currentScrollTop > this.state.scrollHeightTripped) {
      console.log(`yes, currentScrollTop ${currentScrollTop} > this.state.scrollHeightTripped ${this.state.scrollHeightTripped}`)
      this.setState({
        scrollHeightTripped: currentScrollHeight,
        offset: this.state.offset + 100
      })
    }
  }

  render() {
    if (!this.state.charactersLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
        <div className="character-page">
          <CharacterList
            characters={this.state.characters}
            onScroll={(a, b) => this.handleScroll(a, b)}
          />
          <Route
            exact
            path="/character/:id"
            render={({ match }) => <CharacterDetail match={match} />}
          />
        </div>
      </Router>
    );
  }
}

export default CharacterPage;
