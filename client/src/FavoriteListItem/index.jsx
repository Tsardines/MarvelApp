import React, { Component } from "react";
import "./style.css";

class FavoriteListItem extends Component {
  render() {
    let { name, image_url, description } = this.props.favoriteData;
    return (
      <div className="character-list-item">
        <li>{name}</li>
        <img
          src={image_url}
          className="thumbnail"
        />
        <p>{description}</p>
      </div>
    );
  }
}

export default FavoriteListItem;
