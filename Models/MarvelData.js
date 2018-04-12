const db = require("../database/connection");

const MarvelData = {};

MarvelData.getReponseAsJSON = url => {
  const fetch = require("isomorphic-fetch");
  return fetch(url).then(response => response.json());
};

module.exports = MarvelData;
