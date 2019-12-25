const _ = require("lodash");
const {
  RequestedProduct,
  validateRequestedProduct
} = require("../../models/ProductRequest/requestedProduct");

//GET ALL REQUESTEDPRODUCT
exports.getAllRequestedProducts = async (request, response) => {
  try {
    const requestedProduct = await RequestedProduct.find().populate(
      "requestedProducts"
    );
    return response.status(200).send(requestedProduct);
  } catch (err) {
    response.status(404).send(err);
  }
};

//GET A SINGLE REQUESTEDPRODUCT BY ID

exports.getRequestedProductsById = async (request, response) => {
  try {
    const requestedProduct = await RequestedProduct.findById(
      request.params.productId
    );
    return response.send(requestedProduct);
  } catch (err) {
    return response.send(err);
  }
};

//GET A SINGLE REQUESTEDPRODUCT BY BRANDNAME

exports.getRequestedProductsBybrandName = async (request, response) => {
  let brandName = request.params.brandName;
  try {
    const requestedProducts = await RequestedProduct.find({
      brandName: brandName
    });
    return response.status(200).send(requestedProducts);
  } catch (err) {
    return response.status(404).send(err);
  }
};

//POST REQUEST REQUESTEDPRODUCT

exports.addRequestedProduct = async (request, response) => {
  const { error } = validateRequestedProduct(request.body);
  if (error)
    return response.status(400).send(error.details.map(e => e.message));
  const requestedProduct = new RequestedProduct(request.body);
  requestedProduct.save();
  return response.status(200).send(request.body);
};

//UPDATE REQUESTEDPRODUCT BY ID

exports.putRequestedProductsById = async (request, response) => {
  try {
    const requestedProduct = await RequestedProduct.findByIdAndUpdate(
      request.params.productId,
      {
        $set: request.body
      }
    );
    return response.status(200).send(requestedProduct);
  } catch (err) {
    response.status(200).send(err);
  }
};

//Delete REQUESTEDPRODUCT BY ID

exports.deleteRequestedProductsById = async (request, response) => {
  try {
    const requestedProduct = await RequestedProduct.findById(
      request.params.productId
    );
    let result = null;
    if (RequestedProduct) {
      result = await requestedProduct.remove();
    }
    return response.send(result);
  } catch (error) {
    response.status(404).send(error);
  }
};
