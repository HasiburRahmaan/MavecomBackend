const express = require("express");
const users = require("../routes/user/user");
const auth = require("../routes/auth/auth");
const error = require("../middleware/error");


module.exports = function(app) {
  app.use(express.json());
  require("./image")(app);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  require("./routes/product")(app);
  require("./routes/product-request")(app);
  require("./routes/customer")(app);
  require("./routes/order")(app);
  app.use(error);
};
