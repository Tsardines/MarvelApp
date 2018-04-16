import React, { Component } from "react";
import "./style.css";

class FavoriteListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
  }

  deleteFromFavorites(user_id, character_id) {
    fetch(`http://localhost:4567/favorite/1/${this.props.favoriteData.marvel_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }})
      .then(window.location.reload())
}
  render() {
    let { name, image_url, description, marvel_id } = this.props.favoriteData;
    return (
      <div className="favorite-list-item">
        <li className="name">{name}</li>
        <img
          src={image_url}
          className="thumbnail"
        />
        <p className="description">{description}</p>
        <button onClick={this.deleteFromFavorites} >Delete From Favorites</button>
      </div>
    );
  }
}

export default FavoriteListItem;
