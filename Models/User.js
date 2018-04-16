const db = require("../database/connection");

const User = {};

User.findUsername = foundUsername => {
  return db.one("SELECT * FROM user_table WHERE username = $1", [foundUsername]);
};

User.createNewUser = (username, password) => {
  return db.one(
    "INSERT INTO user_table (username, password_digest) VALUES ($1, $2) RETURNING *",
    [username, password]
  );
};

module.exports = User;
