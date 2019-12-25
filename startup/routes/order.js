//order request
const order = require("../../routes/order/order"); //siam
const deliveryInfo = require("../../routes/order/deliveryInfo");
module.exports = function (app) {
  app.use("/api/v1/orders", order);
  app.use("/api/v1/delivery-info", deliveryInfo);
};
