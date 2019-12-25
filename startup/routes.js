const express = require("express");
const users = require("../routes/user/user");
const auth = require("../routes/auth/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  // app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use("/api/v1/users", users);
  app.use("/api/v1/login", auth);

  require("./routes/user")(app);
  require("./routes/product")(app);
  require("./routes/product-request")(app);
  require("./routes/customer")(app);
  require("./routes/order")(app);
  app.use(error);
};
