const db = require("../database/connection");

const FavoriteCharacter = {};

FavoriteCharacter.createFavorite = (user_id, character_id, notes) => {
  return db.one(
    "INSERT INTO favorite_character (user_id, character_id, notes) VALUES ($1, $2, $3) RETURNING *",
    [user_id, character_id, notes]
  );
};

FavoriteCharacter.findAll = user_id => {
  return db.any("SELECT * FROM favorite_character WHERE user_id = $1", [user_id]);
};

FavoriteCharacter.findFavoriteByUserIdAndCharacterId = (user_id, character_id) => {
  return db.any("SELECT * FROM favorite_character WHERE user_id = $1 AND character_id = $2", [
    user_id,
    character_id
  ]);
};

FavoriteCharacter.delete = (user_id, character_id) => {
  return db.result("DELETE FROM favorite_character WHERE user_id = $1 AND character_id = $2", [user_id, character_id]);
};

FavoriteCharacter.edit = (editNoteData, character_id) => {
  return db.none("UPDATE favorite_character SET notes = $1 WHERE character_id = $2", [
    editNoteData,
    character_id
  ]);
};

module.exports = FavoriteCharacter;
