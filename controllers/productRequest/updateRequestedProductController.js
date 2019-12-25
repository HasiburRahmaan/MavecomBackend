const _ = require("lodash");

const {
  validateUpdateRequestedProduct,
  UpdateRequestedProduct
} = require("../../models/ProductRequest/updateRequestedProduct");

//GET ALL updateRequestProduct
exports.getAllUpdateRequestedProducts = async (request, response) => {
  try {
    const updateRequestedProduct = await UpdateRequestedProduct.find().populate(
      "updateRequestedProduct"
    );
    return response.status(200).send(updateRequestedProduct);
  } catch (err) {
    response.status(404).send(err);
  }
};

//GET A SINGLE updateRequestProduct BY ID

exports.getUpdateRequestedProductById = async (request, response) => {
  try {
    const updateRequestedProduct = await UpdateRequestedProduct.findById(
      request.params.productId
    );
    return response.send(updateRequestedProduct);
  } catch (err) {
    return response.send(err);
  }
};
//GET A SINGLE updateRequestProduct BY BRANDNAME

exports.getUpdateRequestedProductBybrandName = async (request, response) => {
  let brandName = request.params.brandName;
  try {
    const updateRequestedProduct = await UpdateRequestedProduct.find({
      brandName: brandName
    });
    return response.status(200).send(updateRequestedProduct);
  } catch (err) {
    return response.status(404).send(err);
  }
};

//POST REQUEST updateRequestProduct

exports.addUpdateRequestedProduct = async (request, response) => {
  const { error } = validateUpdateRequestedProduct(request.body);
  if (error)
    return response.status(400).send(error.details.map(e => e.message));
  const updateRequestedProduct = new UpdateRequestedProduct(request.body);
  updateRequestedProduct.save();
  return response.status(200).send(request.body);
};

//UPDATE updateRequestProduct BY ID

exports.putUpdateRequestedProductById = async (request, response) => {
  try {
    const updateRequestedProduct = await UpdateRequestedProduct.findByIdAndUpdate(
      request.params.productId,
      {
        $set: request.body
      }
    );
    return response.status(200).send(updateRequestedProduct);
  } catch (err) {
    response.status(200).send(err);
  }
};

//Delete REQUESTEDPRODUCT BY ID

exports.deleteUpdateRequestedProductById = async (request, response) => {
  try {
    const updateRequestedProduct = await UpdateRequestedProduct.findById(
      request.params.productId
    );
    let result = null;
    if (RequestedProduct) {
      result = await updateRequestedProduct.remove();
    }
    return response.send(result);
  } catch (error) {
    response.status(404).send(error);
  }
};
