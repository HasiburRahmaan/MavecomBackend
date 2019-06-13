//order request
const orderedProduct = require("../../routes/order/orderedProduct"); //siam
const orderShipping = require("../../routes/order/orderShipping"); //siam
const order = require("../../routes/order/order"); //siam

module.exports = function(app) {
  app.use("/api/ordered-product", orderedProduct); //siam
  app.use("/api/order-shipping", orderShipping); //siam
  app.use("/api/order", order); //siam
};
