const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("This works lol");
});

app.listen(4567, () => console.log("Marver server listening on port 4567!"));
