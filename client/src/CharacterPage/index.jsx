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
      charactersLoaded: false
    };
    this.fetchCharacters = this.fetchCharacters.bind(this);
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters() {
    fetch("http://localhost:4567/api/characters")
      .then(response => response.json())
      .then(charactersAsJson => {
        let characters = charactersAsJson.data.results;
        let charactersWithDescriptionsAndImages = characters.filter(character => {
          return (character.description.length > 0 && !character.thumbnail.path.includes('image_not_available'));
        });
        this.setState({
          characters: charactersWithDescriptionsAndImages,
          charactersLoaded: true
        });
      });
  }

  render() {
    if (!this.state.charactersLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
        <div className="character-page">
          <CharacterList characters={this.state.characters} />
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
