const winston = require("winston");
const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
require('./controllers/seller/sellerOrdersController')
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
  );

  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    //move on
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 100)
// );
app.use(`${__dirname}`, express.static(path.join(__dirname)));

// require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
// require("./startup/config")();
// require("./startup/prod")(app);

// const port = process.env.PORT || 3000;
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on post ${port}...`));
