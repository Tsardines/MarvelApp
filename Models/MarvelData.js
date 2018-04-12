const db = require("../database/connection");

const MarvelData = {};

MarvelData.getReponseAsJSON = url => {
  return fetch(url).then(response => response.json());
};

module.exports = MarvelData;
