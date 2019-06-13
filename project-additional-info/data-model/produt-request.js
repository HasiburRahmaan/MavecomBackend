const requestedProduct = {
  barandName: String,
  productName: String,
  department: String, // Fashion
  catagory: String, // man/cloth/shirt/half
  active: Boolean,
  Images: [
    {
      src: String,
      title: String,
      height: Number,
      width: Number
    }
  ],
  Attrs: {
    size: String,
    color_family: String,
    color: String,
    quantity: Number //more attributes will be valid.
  },
  Pricing: {
    price: Number,
    discountAmount: Number,
    discountAmountLastDate: Date,
    discountPersentage: Number,
    discountPersentageLastDate: Number,
    sale_price: Number
  },
  saleLastDate: Date,
  lastSaleDate: Date
};

var ProductVarificationRequest = {
  _id: ObjectId,
  createdAt: DateTime,
  updatedAt: DateTime,
  seller: ObjectId,
  Products_info: [requestedProduct],
  verify: {
    accepted: Boolean,
    canceled: Boolean,
    date: DateTime,
    Verified: employee_id
  }
};

const updateRequestedProduct = {
  productVariantId: String,
  active: Boolean,
  Images: [
    {
      src: String,
      title: String,
      height: Number,
      width: Number
    }
  ],
  Attrs: {
    size: String,
    color_family: String,
    color: String,
    quantity: Number
  },
  Pricing: {
    price: Number,
    discountAmount: Number,
    discountAmountLastDate: Date,
    discountPersentage: Number,
    discountPersentageLastDate: Number,
    sale_price: Number
  },
  saleLastDate: Date,
  lastSaleDate: Date
};

var ProductUpdateRequest = {
  _id: ObjectId,
  createdAt: DateTime,
  updatedAt: DateTime,
  seller: ObjectId,
  Products_info: [updatedRequestedProduct],
  verify: {
    accepted: Boolean,
    canceled: Boolean,
    date: DateTime,
    Verified: employee_id
  }
};
