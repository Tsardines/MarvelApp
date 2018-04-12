const db = require("../database/connection");

const MarvelData = {};

Tree.getReponseAsJSON = url => {
  return fetch(url).then(response => response.json());
};

export default MarvelData;
