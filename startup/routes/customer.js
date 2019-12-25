const customer = require("../../routes/customer/customer"); //hedaetul
const bodyDetails = require("../../routes/customer/bodyDetails"); //hedaetul
const deliveryAddress = require("../../routes/customer/deliveryAddress"); //hedaetul
const sellerInfo = require("../../routes/customer/sellerInfo"); //hedaetul
const customerSearchKeywords = require("../../routes/customer/customerSearchKeywords"); //hedaetul
const customerTag = require("../../routes/customer/customerTag"); //hedaetul
const topPreferableProduct = require("../../routes/customer/topPreferableProduct"); //hedaetul
const topPreferableSeller = require("../../routes/customer/topPreferableSeller"); //hedaetul
const orderStatus = require("../../routes/customer/orderStatus");

module.exports = function (app) {
  app.use("/api/v1/customers", customer); //hedaetul
  app.use("/api/v1/body-details", bodyDetails); //hedaetul
  app.use("/api/v1/delivery-address", deliveryAddress); //hedaetul
  app.use("/api/v1/seller-info", sellerInfo); //hedaetul
  app.use("/api/v1/customer-search-keywords", customerSearchKeywords); //hedaetul
  app.use("/api/v1/customer-tags", customerTag); //hedaetul
  app.use("/api/v1/top-preferable-product", topPreferableProduct); //hedaetul;
  app.use("/api/v1/top-preferable-seller", topPreferableSeller); //hedaetul
  app.use("/api/v1/order-status", orderStatus);
};
