var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const db = require("./queries");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/agents", db.getAgents);
app.get("/maps", db.getMaps);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
