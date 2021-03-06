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
const tokenService = require("./services/TokenService");
const PORT = process.env.PORT || 3000;
const path = require('path');

//API required strings: timestamp, md5 hash, private key, public key
function generateAPIstring() {
  let TS = new Date().getTime();
  const PRIVATEKEY = 'd29f491c23cfe6990c45739e5fdf11e1e6adfc3e'; //catherine's privatekey
  const PUBLICKEY = 'c595c1f12b2db2191ce42b2a9360ba56'; //catherine's publickey
  let HASH = md5(TS + PRIVATEKEY + PUBLICKEY).toString();
  let APIstring = `apikey=${PUBLICKEY}&ts=${TS}&hash=${HASH}`;
  return APIstring;
}

//get first 100 characters from API
app.get('/api/characters/:offset', (request, response) => {
  let offset = request.params.offset;
  MarvelData.getReponseAsJSON(`https://gateway.marvel.com/v1/public/characters?${generateAPIstring()}&offset=${offset}&limit=100`).then(characters => {
    response.json(characters)
  })
});

//get specific character by id from API
app.get('/api/character/:id', (request, response) => {
  const id = request.params.id
  MarvelData.getReponseAsJSON(`https://gateway.marvel.com/v1/public/characters/${id}?${generateAPIstring()}`).then(character => {
    response.json(character)
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

//REGISTER - add new user and password to DB
app.post('/api/user/new', jsonParser, (request, response) => {
  // get pw entered by user
  const newUsername = request.body.username;
  const rawPassword = request.body.password;
  // salt and hash password
  let hashedPassword = bcrypt.hashSync(rawPassword, salt);
  // create new user in db w/ hashed pw
  User.createNewUser(newUsername, hashedPassword)
  .then(data => {
    console.log('data back from createNewUser: ', data)
    return tokenService.makeToken({
      username: data
    })
  })
  .then(token => {
    console.log('token: ', token)
    response.json({
      token: token
    })
  })
  // .then(
  //   response.send("You created a new user!")
  // );
});

// LOGIN the user if their username and password are correct.
app.post("/login", jsonParser, (request, response) => {
  const enteredUsername = request.body.username;
  const enteredPassword = request.body.password;
  console.log(enteredUsername);
  User.login(request.body)
    .then(data =>
      tokenService.makeToken({
        username: data
      })
    )
    .then(token => {
      console.log('token:', token)
      response.json({
        token: token
      })
    })
    .catch(err => console.log(`throwing an error: ${err}`));
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
  MarvelCharacter.countByMarvelId(characterId)
    .then(count => {
      console.log(count);
      //if character exists in marvel_character, Favorite.getFavorite()
      if (count > 0) {
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
        fetch(`https://gateway.marvel.com/v1/public/characters/${characterId}?${generateAPIstring()}`)
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
      }
    })
});

//deletes a character from a specific user's favorite list
app.delete('/favorite/:user_id/:character_id', urlencodedParser, (request, response) => {
  const userId = request.params.user_id
  const characterId = request.params.character_id
  FavoriteCharacter.delete(userId, characterId).then(
    response.send('You deleted users favorite item')
  )
});

//edits a character's note in a specific user's favorite list
app.put("/favorite/edit/:user_id/:character_id", jsonParser, (request, response) => {
  const editNoteData = request.body.notes
  const userId = request.params.user_id
  const characterId = request.params.character_id
  FavoriteCharacter.edit(editNoteData, userId, characterId).then(
    response.send('You edited your note')
  );
});

app.get("/marvel_character/:character_id", (request, response) => {
  const characterId = request.params.character_id
  MarvelCharacter.getByMarvelId(characterId).then(characterData => {
    response.json(characterData)
    }
  )
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "build")));
}

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.get("/*", function(request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {console.log(`Marvel server listening on port ${PORT}!`)});
