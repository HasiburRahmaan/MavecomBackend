const productUpdateRequest = require("../../routes/productRequest/productUpdateRequest"); //siam
const requestedProduct = require("../../routes/productRequest/requestedProduct"); //siam
const productVarificationRequest = require("../../routes/productRequest/productVarificationRequest"); //siam
const updateRequestedProduct = require("../../routes/productRequest/updateRequestedProduct"); //siam

module.exports = function(app) {
  app.use("/api/product-update-request", productUpdateRequest); //siam
  app.use("/api/requested-product", requestedProduct); //siam
  app.use("/api/product-varification-request", productVarificationRequest); //siam
  app.use("/api/update-requested-product", updateRequestedProduct); //siam
};
