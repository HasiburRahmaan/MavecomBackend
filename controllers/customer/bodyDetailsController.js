const _ = require("lodash");
const {
  BodyDetails,
  validationBodyDetails
} = require("../../models/customer/bodyDetails");
const { Customer } = require("../../models/customer/customer");

exports.addBodyDetails = async (req, res) => {
  try{
    const { error } = validationBodyDetails(req.body);
    if (error) return res.status(422).send(error.details.map(e => e.message));

    let bodyDetails = await BodyDetails.findOne({ customerId: req.customerId });
    if (bodyDetails)
      return res.status(400).send("Customer already has a body details.");

    bodyDetails = new BodyDetails(req.body);
    await bodyDetails.save();
    return res.status(200).send(bodyDetails);
  }
  catch(e){
    console.log(e)
  }
  
};

exports.getAllBodyDetails = async (req, res) => {
  const bodyDetailses = await BodyDetails.find();
  return res.status(200).send(bodyDetailses);
};

exports.getBodyDetailsById = async (req, res) => {
  const bodyDetails = await BodyDetails.findOne({ customerId: req.params.id });

  return bodyDetails
    ? res.status(200).send(bodyDetails)
    : res.status(404).send("not found");
};

exports.deleteBodyDetails = async (req, res) => {
  const bodyDetails = await BodyDetails.findById(req.params.customerId);
  let result = null;
  if (bodyDetails) {
    result = await bodyDetails.remove();
  }
  return res.send(result);
};

exports.updateBodyDetails = async (req, res) => {
  const { error } = validationBodyDetails(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  let customerId = req.params.customerId;

  const result = await BodyDetails.findByIdAndUpdate(
    req.params.customerId, {
      $set: req.body
    }
  );
  Customer.findOneAndUpdate(
    { _id: customerId },
    {
      $set: {
        updatedAt: new Date()
      }
    },
    {useFindAndModify:false}
  );

  return res.status(200).send(result);
};
