var shopping_cart = {
  id: ObjectId,
  customer_id: String,
  products: [
    {
      sellerId: ObjectId,
      productId: String,
      productVariantId: String,
      title: String,
      quantity: Number,
      unit_price: Number,
      discount_amount: Number,
      discount_percentage: Number
    }
  ],
  created_at: Date
};
