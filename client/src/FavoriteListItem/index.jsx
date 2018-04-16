import React, { Component } from "react";
import "./style.css";

class FavoriteListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesInput: ''
    };
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.updateNoteInDB = this.updateNoteInDB.bind(this);
  }

  componentDidMount() {
    this.setState({
      notesInput: this.props.favoriteData.notes
    })
  }

  deleteFromFavorites(user_id, character_id) {
    fetch(`http://localhost:4567/favorite/1/${this.props.favoriteData.marvel_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }})
      .then(window.location.reload())
}

handleNotesChange(evt) {
  this.setState({
    notesInput: evt.target.value
  })
}

updateNoteInDB(evt) {
  evt.preventDefault()
  const body = {
    notes: this.state.notesInput
  }
  console.log("Marvel ID", this.props.favoriteData.character_id)
  fetch(`http://localhost:4567/favorite/edit/1/${this.props.favoriteData.character_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
}

  render() {
    let { name, image_url, description, marvel_id, notes } = this.props.favoriteData;
    return (
      <div className="favorite-list-item">
        <li className="name">{name}</li>
        <img
          src={image_url}
          className="thumbnail"
        />
        <p className="description">{description}</p>
        <form onSubmit={this.updateNoteInDB}>
          <input type="text" value={this.state.notesInput} onChange={this.handleNotesChange}>
          </input>
          <input type="submit" value="Submit Note"></input>
        </form>
        <button onClick={this.deleteFromFavorites} >Delete From Favorites</button>
      </div>
    );
  }
}

export default FavoriteListItem;
