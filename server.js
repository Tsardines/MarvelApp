const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bcrypt = require("bcryptjs");
const salt = "$2a$10$7BfZk7868jGqY5fXtZrZ1e";
const fetch = require("isomorphic-fetch");
const FavoriteCharacter = require("./Models/FavoriteCharacter");
const User = require("./Models/User");
const MarvelCharacter = require("./Models/MarvelCharacter");
const MarvelData = require("./Models/MarvelData");
const cors = require("cors");
app.use(cors());
const md5 = require('md5');

//API required strings: timestamp, md5 hash, private key, public key
function generateAPIstring() {
  let TS = new Date().getTime();
  const PRIVATEKEY = 'd29f491c23cfe6990c45739e5fdf11e1e6adfc3e'; //catherine's privatekey
  const PUBLICKEY = 'c595c1f12b2db2191ce42b2a9360ba56'; //catherine's publickey
  let HASH = md5(TS + PRIVATEKEY + PUBLICKEY).toString();
  let APIstring = `apikey=${PUBLICKEY}&ts=${TS}&hash=${HASH}`;
  return APIstring;
}

//get all characters from API
app.get('/api/characters', (req, res) => {
  MarvelData.getReponseAsJSON(`http://gateway.marvel.com/v1/public/characters?${generateAPIstring()}&offset=0&limit=100`).then(characters => {
    res.json(characters)
  })
});

//get specific character by id from API
app.get('/api/character/:id', (req, res) => {
  const id = req.params.id
  MarvelData.getReponseAsJSON(`http://gateway.marvel.com/v1/public/characters/${id}?${generateAPIstring()}`).then(character => {
    res.json(character)
  })
});


//SIGNUP - add new user and password to DB
app.post('/signup', urlencodedParser, (request, response) => {
  // get pw entered by user
  const newUsername = request.body.username;
  const rawPassword = request.body.password;
  // salt and hash password
  let hashedPassword = bcrypt.hashSync(rawPassword, salt);
  // create new user in db w/ hashed pw
  User.createNewUser(newUsername, hashedPassword).then(
    response.send("You created a new user!")
  );
});


// LOGIN the user if their username and password are correct.
app.post("/login", urlencodedParser, (request, response) => {
  const enteredUsername = request.body.username;
  const enteredPassword = request.body.password;
  User.findUsername(enteredUsername).then(validUserInfo => {
    const usernameIsMatch = enteredUsername === validUserInfo.username;
    let pwIsMatch = bcrypt.compareSync(enteredPassword, validUserInfo.password_digest);
    //Alternate way of doing the password checking:
      // let hashedEnteredPassword = bcrypt.hashSync(enteredPassword, salt);
      // const pwIsMatch = hashedEnteredPassword === validUserInfo.password_digest;
    if (pwIsMatch && usernameIsMatch) {
      // request.session.authenticated = true;
      // request.session.userId = validUserInfo.id;
      //do some front end thing where user is brought to homepage
      response.send("passwords match");
    } else {
      response.send("Sorry, the password does not match with the username");
      //do some front end thing where user is brought back to login page
    }
  });
});

//gets a specific user's favorite list
app.get('/favorites/:user_id', urlencodedParser, (request, response) => {
  const userId = request.params.user_id
  FavoriteCharacter.findAll(userId).then( favorites => {
      response.send(favorites)
    }
  )
});

//adds a new character to a specific user's favorite list
app.post('/favorite', jsonParser, (request, response) => {
  const userId = request.body.user_id
  const characterId = Number(request.body.marvel_id)
  const notes = ''
  console.log('USERID: ', userId);
  console.log('MARVELID: ', characterId);
  //check if character already exists in marvel_character
  MarvelCharacter.getByMarvelId(characterId)
    .then(character => {
      console.log(character);
      //if character exists in marvel_character, Favorite.getFavorite()
      if (character.length > 0) {
        //create favorite
        FavoriteCharacter.createFavorite(userId, characterId, notes)
          .then(
            response.send('You created a new favorite')
          )
      }
      //else if character does not exist in marvel_character
      //ask api for the data
      else {
        console.log('about to fetch');
        fetch(`http://gateway.marvel.com/v1/public/characters/${characterId}?${generateAPIstring()}`)
            .then(character => {
              console.log('character back from api: ', character);
              character.json()
            .then(characterAsJSON => {
              let character = characterAsJSON.data.results[0]
              let {id, name, description, thumbnail, urls} = character;
              thumbnail = thumbnail.path + '.' + thumbnail.extension;
              let wiki_url = urls[1].url;
              id = Number(id);
              //need to clean this up later using find method
            //create character in marvel_character
            MarvelCharacter.addCharacterToDatabase(id, name, description, thumbnail, wiki_url)
            .then(character => {
                  FavoriteCharacter.createFavorite(userId, characterId, notes)
                    .then(
                      response.send('You created a new favorite')
                    )
              })
            })
          })
}})});

//deletes a character from a specific user's favorite list
app.delete('/favorite/:user_id/:character_id', urlencodedParser, (request, response) => {
  const userId = request.params.user_id
  const characterId = request.params.character_id
  FavoriteCharacter.delete(userId, characterId).then(
    response.send('You deleted users favorite item')
  )
});

//edits a character's note in a specific user's favorite list
app.put("/favorite/edit/:user_id/:character_id", urlencodedParser, (request, response) => {
  const editNoteData = request.body.notes
  const userId = request.params.user_id
  const characterId = request.params.character_id
  FavoriteCharacter.edit(editNoteData, userId, characterId).then(
    response.send('You edited your note')
  );
});

app.listen(4567, () => {console.log("Marvel server listening on port 4567!")});
