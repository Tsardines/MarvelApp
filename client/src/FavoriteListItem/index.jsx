import React, { Component } from "react";
import "./style.css";

class FavoriteListItem extends Component {
  render() {
    let { name, description, thumbnail } = this.props.favoriteData;
    thumbnail = thumbnail.path + "." + thumbnail.extension;
    return (
      <div className="character-list-item">
        <li>{name}</li>
        <img
          src={thumbnail}
          className="thumbnail"
        />
      </div>
    );
  }
}

export default FavoriteListItem;
