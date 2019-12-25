const user = require("../../routes/user/user");
const cart = require("../../routes/user/cart")

module.exports = function (app) {
    app.use("/api/v1/user", user);
    app.use("/api/v1/cart", cart);
}