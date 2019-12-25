const _ = require("lodash");
const {
  TopPreferableProduct,
  validationTopPreferableProduct
} = require("../../models/customer/topPreferableProduct");
const { Customer } = require("../../models/customer/customer");

exports.addTopPreferableProduct = async (req, res) => {
  const { error } = validationTopPreferableProduct(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  const topPreferableProduct = new TopPreferableProduct(req.body);
  topPreferableProduct.save();
  return res.status(200).send(req.body);
};

exports.getAllTopPreferableProduct = async (req, res) => {
  const topPreferableProduct = await TopPreferableProduct.find();
  return res.status(200).send(topPreferableProduct);
};

exports.deleteTopPreferableProduct = async (req, res) => {
  const topPreferableProduct = await TopPreferableProduct.findById(
    req.params.customerId
  );
  let result = null;
  if (topPreferableProduct) {
    result = await topPreferableProduct.remove();
  }
  return res.send(result);
};

exports.updateTopPreferableProduct = async (req, res) => {
  const { error } = validationTopPreferableProduct(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  const result = await TopPreferableProduct.findByIdAndUpdate(
    req.params.customerId,
    {
      $set: req.body
    }
  );
  Customer.findOneAndUpdate(
    { _id: req.body.customerId },
    {
      $set: {
        updatedAt: new Date()
      }
    }
  );

  return res.status(200).send(result);
};
