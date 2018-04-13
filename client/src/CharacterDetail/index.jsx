import React, { Component } from "react";
import "./style.css";

class CharacterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterData: {},
      characterLoaded: false,
      characterId: this.props.match.params.id
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.fetchCharacterById();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    if (this.state.characterId !== Number(this.props.match.params.id)) {
      this.updateData();
    }
  }

  fetchCharacterById() {
    // console.log("fetch happened");
    fetch(`http://localhost:4567/api/characters/${this.state.characterId}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          characterData: response.data.results[0],
          characterLoaded: true
        });
      });
  }

  updateData() {
    this.setState({
      characterId: Number(this.props.match.params.id)
    });
    this.fetchCharacterById();
  }

  render() {
    if (this.state.characterLoaded) {
      let { name, description, thumbnail } = this.state.characterData;
      thumbnail =
        this.state.characterData.thumbnail.path +
        "." +
        this.state.characterData.thumbnail.extension;
      return (
        <div className="character-detail-container">
          <h1>CHARACTER DETAIL</h1>
          <h3>{name}</h3>
          <img src={thumbnail} />
          <p> {description}</p>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default CharacterDetail;
