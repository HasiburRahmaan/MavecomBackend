const customer = require("../../routes/customer/customer"); //hedaetul
const bodyDetails = require("../../routes/customer/bodyDetails"); //hedaetul
const deliveryAddress = require("../../routes/customer/deliveryAddress"); //hedaetul
const sallerInfo = require("../../routes/customer/sallerInfo"); //hedaetul
const customerSearchKeywords = require("../../routes/customer/customerSearchKeywords"); //hedaetul
const customerTag = require("../../routes/customer/customerTag"); //hedaetul
const topPreferableProduct = require("../../routes/customer/topPreferableProduct"); //hedaetul
const topPreferableSeller = require("../../routes/customer/topPreferableSeller"); //hedaetul

module.exports = function(app) {
  app.use("/api/customers", customer); //hedaetul
  app.use("/api/body-details", bodyDetails); //hedaetul
  app.use("/api/delivery-address", deliveryAddress); //hedaetul
  app.use("/api/saller-info", sallerInfo); //hedaetul
  app.use("/api/customer-search-keywords", customerSearchKeywords); //hedaetul
  app.use("/api/customer-tags", customerTag); //hedaetul
  app.use("/api/top-preferable-product", topPreferableProduct); //hedaetul;
  app.use("/api/top-preferable-seller", topPreferableSeller); //hedaetul
};
