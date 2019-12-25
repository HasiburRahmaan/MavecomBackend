const _ = require("lodash");
const {
  CustomerSearchKeywords,
  validateCustomerSearchKeywords
} = require("../../models/customer/customerSearchKeywords");
const { Customer } = require("../../models/customer/customer");

//Functions

async function updateKeywordList(user, keyword) {
  var keywordInSearchKeywordList = false;
  // user.keywordList.map( word =>{
  // if(word.keyword == keyword){
  //     keywordInSearchKeywordList = true;
  //     word.searched+=1;
  // }
  // })

  var length = user.keywordList.length;
  for (var i = 0; i < length; i++) {
    if (user.keywordList[i].keyword == keyword) {
      keywordInSearchKeywordList = true;
      user.keywordList[i].searched += 1;
      break;
    }
  }

  if (keywordInSearchKeywordList) {
    user.save();
    return user;
  } else {
    user.keywordList.push({ keyword });
    user.save();
    return user;
  }
}

async function findKeywordListByUserId(id) {
  var customerWithSearchKeywordList = await CustomerSearchKeywords.find({
    customerId: id
  });
  return customerWithSearchKeywordList[0];
}

//Create
exports.addCustomerSearchKeywords = async (req, res) => {
  const { error } = validateCustomerSearchKeywords(req.body);
  if (error) return res.status(422).send(error.details.map(e => e.message));

  var user = await findKeywordListByUserId(req.body.customerId);
  if (user) {
    // console.log("if");
    res
      .status(200)
      .send(await updateKeywordList(user, req.body.keywordList[0].keyword));
  } else {
    const customerSearchKeywords = new CustomerSearchKeywords(req.body);
    customerSearchKeywords.save();
    return res.status(200).send(req.body);
  }
};

//Get
exports.getAllCustomerSearchKeywords = async (req, res) => {
  const customerSearchKeywords = await CustomerSearchKeywords.find();
  return res.status(200).send(customerSearchKeywords);
};

exports.getSingleCustomerSearchKeywordListById = async (req, res) => {
  var id = req.params.id;
  var customerWithSearchKeywordList = await findKeywordListByUserId(id);
  return customerWithSearchKeywordList
    ? res.send(customerWithSearchKeywordList)
    : res.send(null);
};

//Delete
exports.deleteCustomerSearchKeywords = async (req, res) => {
  const customerSearchKeywords = await CustomerSearchKeywords.findById(
    req.params.customerId
  );
  let result = null;
  if (customerSearchKeywords) {
    result = await customerSearchKeywords.remove();
  }
  return res.send(result);
};

exports.updateCustomerSearchKeywords = async (req, res) => {
  const { error } = validateCustomerSearchKeywords(req.body);
  if (error) return res.status(400).send(error.details.map(e => e.message));

  const result = await CustomerSearchKeywords.findByIdAndUpdate(
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
