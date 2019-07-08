const attribute = require("../../routes/product/attrs");
const brand = require("../../routes/product/brand");
const comment = require("../../routes/product/comment");
const department = require("../../routes/product/department");
const hotProducts = require("../../routes/product/hotProducts");
const product = require("../../routes/product/product");
const productAttrs = require("../../routes/product/productAttrs");
const productBrand = require("../../routes/product/productBrand");
const productDescription = require("../../routes/product/productDescription");
const productTags = require("../../routes/product/productTags");
const productVarient = require("../../routes/product/productVarient");
const shipping = require("../../routes/product/shipping");
const tag = require("../../routes/product/tag");
const express = require("express");

const search = require('../../search/route/tagProductListRoute');
const similarProduct = require('../../recommendation-system/routes/recomendationRoutes')
const app = express();

module.exports = function(app) {
  app.use("/api/attr", attribute);
  app.use("/api/brand", brand);
  app.use("/api/comment", comment);
  app.use("/api/department", department);
  app.use("/api/hot-products", hotProducts);
  app.use("/api/product", product);
  app.use("/api/product-attrs", productAttrs);
  app.use("/api/product-brand", productBrand);
  app.use("/api/product-desc", productDescription);
  app.use("/api/product-tags", productTags);
  app.use("/api/product-varient", productVarient);
  app.use("/api/shipping", shipping);
  app.use("/api/tag", tag);

  app.use("/api/search", search); 
  app.use("/api/similar-product", similarProduct)
};
