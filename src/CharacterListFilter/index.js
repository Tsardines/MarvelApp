import React from "react";

const CharacterListFilter = props => (
  <div>
    <input
      type="text"
      name="task-filter"
      placeholder="filter"
      value={props.filterText}
      onChange={props.onChange}
    />
  </div>
);

export default CharacterListFilter;
