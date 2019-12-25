const { User, validateUser } = require("../../models/user/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");

exports.signup = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  let user = await User.findOne({ email: req.body.email });
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
    .send(_.pick(user, ["_id", "email"]));
};

exports.customer = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.send(user);
};

exports.updatePassword = async(req, res)=>{

  const{error} = validateUpdatePassword(req.body);
  if(error) return res.status(400).send(error.details.map(e => e.message));

  const user = await User.findById(req.user._id);
  let validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!validPassword) return res.status(400).send("Current password did not mach.");
  
  else{
    validPassword = await bcrypt.compare(req.body.newPassword, user.password);
    if(validPassword) 
      return res.status(402).send("Failed ! Your new password is similar to old password.");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);

    let result = await user.save();
    return res.status(200).send(result);
  }
  
}


const validateUpdatePassword = (data)=>{
  const schema = {
    currentPassword:Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
  }
  return Joi.validate(data,schema);
}