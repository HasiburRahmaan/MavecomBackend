Order[
  {
    id: ObjectId,
    invoice: String,
    shipping: {
      customer_id: String,
      customer_name: String,
      phone: Number,
      address: {
        country: String,
        city: String,
        state: String,
        street: String,
        house: String,
        floor: String
      },
      delivery_notes: String,
      tracking: {
        company: String,
        tracking_number: String,
        status: String
      }
    },
    orderedProducts: [
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
    actualCost: Number,
    totalDiscount: Number,
    totalCost: Number,
    delivaryInfo: {
      started_at: Date,
      isDelivered: Boolean,
      isCanceled: Boolean,
      ended_at: Date
    },
    rating: Number,
    created_at: Date,
    updated_at: Date,
    isCanceled: Boolean,
    canceledAt: Date,
    payment: {
      method: String,
      transiction_id: String
    }
  }
];
