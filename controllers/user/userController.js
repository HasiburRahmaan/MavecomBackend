const { User, validateUser } = require("../../models/user/user");
const bcrypt = require("bcrypt");
const config = require("config");
const _ = require("lodash");

exports.signup = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username already exists.");

  user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send("User already registered with this email account.");

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .status(200)
    .send(_.pick(user, ["_id", "username", "email"]));
};

exports.customer = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.send(user);
};
