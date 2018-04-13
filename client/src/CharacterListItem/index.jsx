import React, { Component } from "react";
import "./style.css";

class CharacterListItem extends Component {
  render() {
    let { name, description, thumbnail } = this.props.characterData;
    thumbnail = thumbnail.path + "." + thumbnail.extension;
    return (
      <div className="character-list-item">
        <li>{name}</li>
        <img
          // onClick={evt => this.props.onClick(evt, name)}
          src={thumbnail}
          className="thumbnail"
        />
      </div>
    );
  }
}

export default CharacterListItem;
