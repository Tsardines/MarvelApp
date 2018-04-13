import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CharacterList from "../CharacterList";
import CharacterDetail from "../CharacterDetail";
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
      // fetch("http://gateway.marvel.com/v1/public/characters?apikey=c595c1f12b2db2191ce42b2a9360ba56&ts=1523454631254&hash=99a15b4f4557e89e9b94dea04c439bd5&offset=0&limit=100")
      .then(response => response.json())
      .then(charactersAsJson => {
        let characters = charactersAsJson.data.results;
        this.setState({
          characters: characters,
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
          <CharacterList
            characters={this.state.characters}
          />
          <Route
            exact
            path="/character/:id"
            render={ ({match}) =>
            <CharacterDetail match={match} refreshWines={this.refreshWines}/>}
          />
        </div>
      </Router>
    );
  }
}

export default CharacterPage;
