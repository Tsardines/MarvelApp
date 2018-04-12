const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bcrypt = require("bcryptjs");
const salt = '$2a$10$7BfZk7868jGqY5fXtZrZ1e';
const FavoriteCharacter = require("./Models/FavoriteCharacter");
const User = require("./Models/User");
const MarvelCharacter = require("./Models/MarvelCharacter");
const MarvelData = require("./Models/MarvelData")

//create function to generate time stamp & matching hash

app.get('/api/characters', (req, res) => {
  MarvelData.getReponseAsJSON('http://gateway.marvel.com/v1/public/characters?apikey=c595c1f12b2db2191ce42b2a9360ba56&ts=1523454631254&hash=99a15b4f4557e89e9b94dea04c439bd5').then(characters => {
    res.json(characters)
  })
});

app.get('/api/characters/:id', (req, res) => {
  const id = req.params.id
  MarvelData.getReponseAsJSON(`http://gateway.marvel.com/v1/public/characters/${id}?apikey=c595c1f12b2db2191ce42b2a9360ba56&ts=1523454631254&hash=99a15b4f4557e89e9b94dea04c439bd5`).then(character => {
    res.json(character)
  })
});

// LOGIN the user if their username and password are correct.
app.post('/user', urlencodedParser, (request, response) => {
  const enteredUsername = request.body.username;
  const enteredPassword = request.body.password;
  // // let hashedEnteredPassword = bcrypt.hashSync(enteredPassword, salt);
  User.findUsername(enteredUsername)
    .then((validUserInfo) => {
      const usernameIsMatch = enteredUsername === validUserInfo.username;
      // let pwIsMatch = bcrypt.compareSync(enteredPassword, validUserInfo.password);
      const pwIsMatch = enteredPassword === validUserInfo.password_digest;
      if (pwIsMatch && usernameIsMatch) {
        // request.session.authenticated = true;
        // request.session.userId = validUserInfo.id;
        //do some front end thing where user is brought to homepage
        response.send('passwords match');
      } else {
        response.send('Sorry, the password does not match with the username');
        //do some front end thing where user is brought back to login page
      }
    })
});

app.post('/signup', urlencodedParser, (request, response) => {
  // get pw entered by user
  const newUsername = request.body.username;
  const rawPassword = request.body.password;
  // salt and hash password
  // let hashedPassword = bcrypt.hashSync(rawPassword, salt);
  // create new user in db w/ hashed pw
  User.createNewUser(newUsername, rawPassword)
    .then(
      response.send('You created a new user!')
    )
});

app.post('/favorites/:user_id/:character_id', urlencodedParser, (request, response) => {
  const userId = request.params.user_id
  const characterId = request.params.character_id
  const notes = ''
  FavoriteCharacter.createFavorite(userId, characterId, notes)
  .then(
    response.send('You created a new favorite')
  )
});

app.get('/favorites/:user_id', urlencodedParser, (request, response) => {
  const userId = request.params.user_id
  FavoriteCharacter.findAll(userId).then(
    response.send('These are all of user 1 favorites')
  )
});

app.delete('/favorites/:user_id/:character_id', urlencodedParser, (request, response) => {
  const userId = request.params.user_id
  const characterId = request.params.character_id
  FavoriteCharacter.delete(userId, characterId).then(
    response.send('You deleted user 1 favorite item')
  )
});

app.listen(4567, () => console.log("Marvel server listening on port 4567!"));
