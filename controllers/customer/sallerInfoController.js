const _ = require("lodash");
const {
  SellerInfo,
  validationSellerInfo
} = require("../../models/customer/sellerInfo");
const { Customer } = require("../../models/customer/customer");

exports.addSellerInfo = async (req, res) => {
  const { error } = validationSellerInfo(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  const sellerInfo = new SellerInfo(req.body);
  sellerInfo.save();
  return res.status(200).send(req.body);
};

exports.getAllSellerInfo = async (req, res) => {
  const sellerInfo = await SellerInfo.find();
  return res.status(200).send(sellerInfo);
};

exports.getSellerInfoById = async (req, res) => {
  var id = req.params.customerId;
  var sellerInfo = await SellerInfo.findById(id).populate("customerId");
  if (sellerInfo) {
    res.status(200).send(sellerInfo);
  } else {
    res.status(404).send("Seller not found by this id");
  }
};

exports.getSellerInfoByCustomerId = async (req, res) => {
  var sallerInfo = await SallerInfo.find({ customerId: req.params.customerId }).populate("customerId");
  if (sallerInfo) {
    res.status(200).send(sallerInfo);
  } else {
    res.status(404).send("Seller not found by customer");
  }
};

exports.deleteSellerInfo = async (req, res) => {
  const sellerInfo = await SellerInfo.findById(req.params.customerId);
  let result = null;
  if (sellerInfo) {
    result = await sellerInfo.remove();
  }
  return res.send(result);
};

exports.updateSellerInfo = async (req, res) => {
  const { error } = validationSellerInfo(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  const result = await SellerInfo.findByIdAndUpdate(req.params.customerId, {
    $set: req.body
  });
  Customer.findOneAndUpdate(
    {
      _id: req.body.customerId
    },
    {
      $set: {
        updatedAt: new Date()
      }
    }
  );

  return res.status(200).send(result);
};
