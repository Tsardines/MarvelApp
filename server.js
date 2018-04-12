const express = require('express')
const app = express();
const FavoriteCharacter = require("./Models/FavoriteCharacter");
const User = require("./Models/User");
const MarvelCharacter = require("./Models/MarvelCharacter");
const MarvelData = require("./Models/MarvelData")

app.listen(4567, () => console.log('App listening on port 4567, baby!'))
