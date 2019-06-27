const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user/user");
const Joi = require("joi");
const {
  Customer,
  validateCustomer
} = require("../../models/customer/customer");
const {
  DeliveryAddress,
  validationDeliveryAddress
} = require("../../models/customer/deliveryAddress");
ObjectId = require("mongodb").ObjectID;

exports.addCustomer = async (req, res) => {

  const { error } = validateCustomer(req.body);
  if (error)
    return res.status(422).send(error.details.map(e => e.message));

  let user = await User.findOne({ username: req.body.userInfo.username });
  if (user) return res.status(409).send("Username already exists.");

  user = await User.findOne({ email: req.body.userInfo.email });
  if (user)
    return res
      .status(409)
      .send("User already registered with this email account.");

  user = new User(_.pick(req.body.userInfo, ["username", "password", "email"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  
  // const token = user.generateAuthToken();
  
  let customer = new Customer(req.body);
  customer.userInfo._id = user._id;
  
  customer._id = user._id;
  customer.userInfo.password = await bcrypt.hash(customer.userInfo.password, salt);
  customer = await customer.save();
  
  return res
    // .header("x-auth-token", token)
    .status(200)
    .send(customer);
};

exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find();
  return res.status(200).send(customers);
};

exports.deleteCustomer = async (req, res) => {

  const customer = await Customer.findById(req.params.customerId).select("-userInfo.password");
  let result = null;
  if (customer) {
    result = await customer.remove();
  }
  return res.send(result);
};

exports.updateCustomer = async (req, res) => {

  const { error } = validateCustomerforUpdate(req.body);
  if(error)
    return res.status(400).send(error.details.map(e => e.message))

  if(req.user._id != req.body.userInfo._id || req.user._id !=req.params.customerId)
    return res.status(404).send("Acccess denied");

  // req.body.userInfo.updatedAt = new Date();
  const customerId = req.body.userInfo._id;
  delete req.body.userInfo._id;
  await User.findByIdAndUpdate(customerId,{$set:req.body.userInfo});

  // req.body.updatedAt = new Date();
  const result = await Customer.findByIdAndUpdate(req.params.customerId, {
    $set: req.body
  });
  return res.status(200).send(result);
};

exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.customerId);
  return res.send(customer);
};

exports.getCustomersByUserName = async (req, res) => {
  let username = req.params.username;
  const customer = await Customer.find({
    "userInfo.username": username
  });
  return res.send(customer);
};

exports.getCustomersByName = async (req, res) => {
  let customerName = req.params.customerName;
  const customers = await Customer.find({
    fullName: { $regex: new RegExp(customerName, "i") }
  });
  return res.send(customers);
};

exports.getCustomersByCity = async (req, res) => {
  let city = req.query.city;
  const addresses = await DeliveryAddress.find({
    city
  }).populate("customerId").select("customerId");

  return res.send(addresses);
};

exports.getCustomerByDivision = async (req, res) => {
  let division = req.query.division;
  const addresses = await DeliveryAddress.find({
    division
  }).populate("customerId").select("customerId");
  return res.send(addresses);
};


function validateCustomerforUpdate(customer){
  const schema={
      _id:Joi.objectId(),
      userInfo: Joi.object().keys({
          _id:Joi.objectId().required("customer id not provided"),
          password: Joi.string().max(1024).min(6).required(),
          email: Joi.string().email().required()
      }),
      fullName: Joi.string().max(50).min(3),
      lFullName: Joi.string().max(50).min(3),

      religion: Joi.string().max(100).min(3),
      gender: Joi.string().max(100).min(3),
      assets: Joi.object().keys({
          images:Joi.array().items(
                  Joi.object().keys({
                  src: Joi.string().max(1000).min(3),
                  height: Joi.number().min(1),
                  width: Joi.number().min(1)
              })
          ),
          phone: Joi.string().max(11).min(11),
      }),
      active: Joi.boolean(),
  }
  return Joi.validate(customer,schema,{abortEarly: false});
}