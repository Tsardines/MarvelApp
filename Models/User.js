const db = require("../database/connection");
const bcrypt = require("bcryptjs");

const User = {};

User.findByUsername = foundUsername => {
  return db.one("SELECT * FROM user_table WHERE username = $1 LIMIT 1", [foundUsername]);
};

//thanks Ryan for solution code
User.login = user => {
  return User.findByUsername(user.username)
    .then(userData => {
      const isAuthed = bcrypt.compareSync(user.password, userData.password_digest);
      if (!isAuthed) throw new Error('invalid credentials');
      return userData;
    })
}

User.createNewUser = (username, password) => {
  return db.one(
    "INSERT INTO user_table (username, password_digest) VALUES ($1, $2) RETURNING *",
    [username, password]
  );
};

module.exports = User;
