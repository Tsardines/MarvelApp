const db = require("../database/connection");

const MarvelCharacter = {};

MarvelCharacter.getByMarvelId = (marvel_id) => {
  return db.any(`SELECT * FROM marvel_character WHERE marvel_id = $1`, [marvel_id])
}

MarvelCharacter.addCharacterToDatabase = (marvel_id, name, description, thumbnail, wiki_url) => {
  return db.one(
    `INSERT INTO marvel_character (marvel_id, name, description, image_url, wiki_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [marvel_id, name, description, thumbnail, wiki_url]);
}

module.exports = MarvelCharacter;
