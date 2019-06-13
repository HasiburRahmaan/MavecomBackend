//sellerId is customer id here.

const sellerProduct = {
  sellerId: ObjectId,
  productId: ObjectId,
  productVarientId: ObjectId
};

const sellerTopSold = {
  sellerId: ObjectId,
  productList: [
    {
      productId: ObjectId,
      varientId: ObjectId,
      sold: Number
    }
  ]
};

const topSetisfiedCustomer = {
  sellerId: ObjectId,
  customerList: [customerId]
};
