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
const productVariant = require("../../routes/product/productVariant");
const shipping = require("../../routes/product/shipping");
const tag = require("../../routes/product/tag");
const review = require("../../routes/product/review")
const express = require("express");

const search = require("../../search/route/tagProductListRoute");
const similarProduct = require("../../recommendation-system/routes/recomendationRoutes");
// const app = express();

const fs = require("fs");
const path = require("path");
const app = express();

const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let date = new Date();
    date = "" + date.getDate() + date.getMonth() + date.getFullYear();
    const uploadDir = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "uploads",
      "products",
      `${date}`
    );
    fs.mkdir(uploadDir, function (e) {
      if (!e || (e && e.code === "EEXIST")) {
        cb(null, uploadDir);
      } else {
        console.log("File creation failed,", e);
      }
    });
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + new Date().toISOString() + "-" + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
  {
    name: "thumbnailImages",
    maxCount: 1
  },
  {
    name: "images",
    maxCount: 100
  }
]);

module.exports = function (app) {
  app.use("/api/v1/attr", attribute);
  app.use("/api/v1/brand", brand);
  app.use("/api/v1/comment", comment);
  app.use("/api/v1/department", department);
  app.use("/api/v1/hot-products", hotProducts);
  app.use("/api/v1/products", upload, product);
  app.use("/api/v1/product-attrs", productAttrs);
  app.use("/api/v1/product-brand", productBrand);
  app.use("/api/v1/product-desc", productDescription);
  app.use("/api/v1/product-tags", productTags);
  app.use("/api/v1/product-variant", upload, productVariant);
  app.use("/api/v1/shipping", shipping);
  app.use("/api/v1/tag", tag);
  app.use("/api/v1/review", review);

  app.use("/api/v1/search", search);
  app.use("/api/v1/similar-product", similarProduct);
};
