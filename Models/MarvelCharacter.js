const db = require("../database/connection");

const MarvelCharacter = {};
MarvelCharacter.addCharacterToDatabase = character_id => {
  return db.one(
    "INSERT INTO marvel_character (marvel_id, name, description, image_url, series, wiki_url)
      VALUES ($1, $2, $3, $4, $5, $6)",
      [marvel_id, name, description, image_url, series, wiki_url]
    )
  )
}

module.exports = MarvelCharacter;
