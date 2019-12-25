const _ = require("lodash");
const {
  DeliveryAddress,
  validationDeliveryAddress
} = require("../../models/customer/deliveryAddress");

const { Customer } = require("../../models/customer/customer");

exports.addDeliveryAddress = async (req, res) => {
  const { error } = validationDeliveryAddress(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  const deliveryAddress = new DeliveryAddress(req.body);
  deliveryAddress.save();
  return res.status(200).send(req.body);
};

exports.getAllDeliveryAddress = async (req, res) => {
  const deliveryAddress = await DeliveryAddress.find();
  return res.status(200).send(deliveryAddress);
};
exports.getDeliveryAddressById = async (req, res) => {
  var id = req.params.customerId;

  const deliveryAddress = await DeliveryAddress.find({ customerId: id });
  if (deliveryAddress) {
    res.status(200).send(deliveryAddress);
  } else {
    res.status(404).send("delivery addess is  not found");
  }
};

exports.deleteDeliveryAddress = async (req, res) => {
  const deliveryAddress = await DeliveryAddress.findById(req.params.customerId);
  let result = null;
  if (deliveryAddress) {
    result = await deliveryAddress.remove();
  }
  return res.send(result);
};

exports.updateDeliveryAddress = async (req, res) => {
  const { error } = validationDeliveryAddress(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  let customerId = req.params.customerId

  const result = await DeliveryAddress.findByIdAndUpdate(
    req.params.customerId, {
      $set: req.body
  });
  Customer.findOneAndUpdate(
    { _id: customerId},
    {
      $set: {
        updatedAt: new Date()
      }
    },
    {useFindAndModify:false}
  );

  return res.status(200).send(result);
};
