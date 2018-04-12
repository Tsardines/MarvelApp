const db = require("../database/connection");

const User = {};

User.findUsername = foundUsername => {
  return db.one("SELECT * FROM users WHERE username = $1", [foundUsername]);
};

User.createNewUser = (newUser) => {
  return db.one(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [newUser.username, newUser.password]
  );
};

module.exports = User;
