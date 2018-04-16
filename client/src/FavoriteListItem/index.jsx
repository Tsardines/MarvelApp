import React, { Component } from "react";
import "./style.css";

class FavoriteListItem extends Component {
  render() {
    let { name, image_url, description } = this.props.favoriteData;
    return (
      <div className="favorite-list-item">
        <li className="name">{name}</li>
        <img
          src={image_url}
          className="thumbnail"
        />
        <p className="description">{description}</p>
      </div>
    );
  }
}

export default FavoriteListItem;
