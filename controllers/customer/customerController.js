const { BodyDetails } = require("../../models/customer/bodyDetails");

const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user/user");
const Joi = require("joi");
const {
  Customer,
  validateCustomer,
  validateCustomerforUpdate,
  validateCustomerforRegister
} = require("../../models/customer/customer");
const {
  DeliveryAddress,
  validationDeliveryAddress
} = require("../../models/customer/deliveryAddress");
ObjectId = require("mongodb").ObjectID;

exports.addCustomer = async (req, res) => {
  const { error } = validateCustomerforRegister(req.body);
  if (error) return res.status(422).send(error.details.map(e => e.message));
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(409).send("Username already exists.");

    user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send("User already registered with this email account.");

    user = new User(_.pick(req.body, ["username", "password", "email"]));

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    user.password = password;
    user = await user.save();
    const token = user.generateAuthToken();

    delete req.body.password;
    let customer = new Customer(req.body);
    customer._id = user._id;

    let bodyDetails = new BodyDetails({ _id: customerId });
    await bodyDetails.save();


    customer = await customer.save();
    return res
      .header("x-auth-token", token)
      .status(200)
      .send(customer);
  } catch (e) {
    console.log(e);
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).send(customers);
  } catch (error) {
    res.status(404).send(error);
  }
};


exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.customerId).select(
    "-password"
  );
  let result = null;
  if (customer) {
    result = await customer.remove();
  }
  return res.send(result);
};

exports.updateCustomer = async (req, res) => {
  const { error } = validateCustomerforUpdate(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));
  const customerId = req.params.customerId;
  if (req.user._id !== customerId)
    return res.status(404).send("Acccess denied");

  req.body.updatedAt = new Date();

  // req.body.updatedAt = new Date();
  const result = await Customer.findByIdAndUpdate(customerId, {
    $set: req.body
  }, { useFindAndModify: false });
  return res.status(200).send(result);
};

exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.customerId).populate("bodyDetails deliveryAddress sellerInfo _id");
  return res.send(customer);
};

exports.getCustomersByUserName = async (req, res) => {
  let username = req.params.username;
  const customer = await Customer.find({
    username: username
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
  })
    .populate("customerId")
    .select("customerId");

  return res.send(addresses);
};

exports.getCustomerByDivision = async (req, res) => {
  let division = req.query.division;
  const addresses = await DeliveryAddress.find({
    division
  })
    .populate("customerId")
    .select("customerId");
  return res.send(addresses);
};

exports.getSelf = async (req, res) => {
  console.log(req.user);
  let customer = await Customer.findById(req.user._id);
  return res.status(200).send(customer);
};
