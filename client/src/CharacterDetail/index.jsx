import React, { Component } from "react";
import "./style.css";

class CharacterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterData: null
    };
    this.fetchCharacterById = this.fetchCharacterById.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    // this.getCharacterFromDB = this.getCharacterFromDB.bind(this);
  }

  handleFavoriteClick(evt) {
    let user_id = 1; //hard coded user_id for now
    let marvel_id = this.state.characterData.id;
    console.log(`you clicked fav button. marvel_id ${marvel_id}, user_id ${user_id}`);
    const body = {
      user_id: user_id,
      marvel_id: marvel_id
    };
    console.log(JSON.stringify(body))
    fetch(`http://localhost:4567/favorite`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });





    //1. getCharacterFromDB
      // if character is in DB, return character info
      // else,
        //fetch from api,
        //insert character into db
        //return character info
    //2. addCharacterToFavorites(user_id)
        //three args: user_id, character_id, notes
  }

  // getCharacterFromDB(){
  //   let marvel_id = this.state.characterData.id;
  //   fetch(`http://localhost:4567/character/${marvel_id}`)
  //     .then(response => response.json())
  //     .then(characterAsJson => {
  //       //pass back the character, and use the character_id to pass to favorites
  //       console.log(characterAsJson);
  //     })
  // }

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
    fetch(`http://localhost:4567/api/character/${id}`)
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
        <button
          onClick={this.handleFavoriteClick}
          className="favorite-button">
          Add To Favorites
        </button>
        <h3>{name}</h3>
        <img src={thumbnail} />
        <p> {description}</p>
      </div>
    );
  }
}

export default CharacterDetail;
