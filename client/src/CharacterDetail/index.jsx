import React, { Component } from "react";
import "./style.css";

class CharacterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterData: null
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    this.fetchCharacterById(id);
  }

  componentDidUpdate() {
    let { id } = this.props.match.params;
    if (this.state.characterData.id != id) {
      this.fetchCharacterById(this.props.match.params.id);
    }
  }

  fetchCharacterById(id) {
    fetch(`http://localhost:4567/api/characters/${id}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          characterData: response.data.results[0],
          characterLoaded: true
        });
      });
  }

  render() {
    if (!this.state.characterData) {
      return <h4>Loading...</h4>
    }

    let { name, description, thumbnail } = this.state.characterData;
    thumbnail = `${thumbnail.path}.${thumbnail.extension}`;

    return (
      <div className="character-detail-container">
        <h1>CHARACTER DETAIL</h1>
        <h3>{name}</h3>
        <img src={thumbnail} />
        <p> {description}</p>
      </div>
    );
  }
}

export default CharacterDetail;
