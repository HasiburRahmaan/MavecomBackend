const topPreferableProduct = {
  customerId: ObjectId,
  topProduct: [
    {
      productId: ObjectId,
      productVarientId: ObjectId,
      total_buy: Number
    }
  ]
};

const customerSearchKeywords = {
  customerId: ObjectId,
  keywordList: [
    {
      keyword: String,
      searched: Number
    }
  ]
};

const customerTag = {
  //we already have a tag for product model,
  //tag for customers is also share the same document.
  tagId: ObjectId,
  customerId: ObjectId
};

const deliveryAddress = {
  customerId: ObjectId,
  country: String,
  Division: String,
  Thana: String,
  Ward: String,
  city: String,
  state: String,
  road: String,
  house: String,
  floor: String,
  Description: String,
};

var bodyDetails = {
  customerId: ObjectId,
  height: Number,
  weight: Number,
  neck: Number,
  thigh: Number,
  chest: Number,
  belly: Number,
  color: String
};

var customer = {
  userInfo: {
    username: String,
    password: password,
    email: String
  },
  total_buy: Number,
  religion: String,
  gender: String,
  assets: {
    images: [
      {
        height: Number,
        width: Number,
        src: String
      }
    ]
  },
  isSeller: Boolean,
  active: Boolean
};

var sellerInfo= {
  customerId:ObjectId,
  total_sale: Number,
  Rank: Number
},

const topPreferableSeller = {
  customerId: objectId,
  sellerList: [sellerId]
};
