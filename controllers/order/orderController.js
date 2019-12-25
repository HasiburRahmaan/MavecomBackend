const _ = require("lodash");
const { User } = require("../../models/user/user");
const { Customer } = require("../../models/customer/customer");
const { validateOrder, Order } = require("../../models/order/order");
const {
  DeliveryAddress,
  validationDeliveryAddress
} = require("../../models/customer/deliveryAddress");
const {
  SallerInfo,
  validationSallerInfo
} = require("../../models/customer/sellerInfo");
const { ProductVariant } = require("../../models/product/productVariant");
const { Product } = require("../../models/product/product")

const { addOrderOnTotalSellOfSeller } = require("../../controllers/seller/sellerOrdersController")

//post a order
exports.addOrder = async (req, res) => {
  // const { error } = validateOrder(req.body);
  // if (error) return res.status(400).send(error.details.map(e => e.message));
  // console.log("req-body:===>", req.body)
  const customer = Customer.findById(req.body.customertId);
  if (!customer)
    return res
      .status(404)
      .send("No customer found with this Id", req.body.customertId);

  let orderedProducts = JSON.parse(JSON.stringify(req.body.orderedProducts));
  let order = await processOrder(orderedProducts);
  // console.log("Proccessed Order=====>", order)

  if (!order.valid) return res.status(order.status).send(order.errorMsg);

  const { totalCost, totalDiscountAmount, totalDiscountPercentage } = order;

  let orderObject = {
    customerId: req.body.customerId,
    orderedProducts: req.body.orderedProducts,
    totalCost
  }
  let OrderedProduct = await new Order(orderObject)

  //From here, an Inner function for creating separate Array of product for seller has been started. this function will be separated later 

  let products = req.body.orderedProducts;
  let productArrayOfSeller = {}

  for (let i = 0; i < products.length; i++) {
    let e = products[i];
    let sellerObject = await Product.findById(e.productId).select("seller -_id");
    let sellerId = sellerObject.seller.toString();
    let obj = { productId: e.productId, variantId: e.productVariantId, quantity: e.quantity };
    productArrayOfSeller[sellerId] = productArrayOfSeller[sellerId] ? [...productArrayOfSeller[sellerId], obj] : [obj]
  }

  for (let i in productArrayOfSeller) {
    let obj = {
      _id: i,
      order: {
        _id: OrderedProduct._id,
        products: productArrayOfSeller[i],
        status: "pending"
      }
    }
    let sellerOrders = await addOrderOnTotalSellOfSeller(obj, res)

    if (sellerOrders) {
      await sellerOrders.save()
    }

  }
  //Inner function ended

  OrderedProduct.save()
  const update = await updateProductVariantQuantity(req.body.orderedProducts);
  if (update.accident) {
    return response.status(update.status).send(update.errorMsg);
  }
  return res.status(200).send(OrderedProduct);
};

//GET ALL order
exports.getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    return res.status(200).send(order);
  } catch (err) {
    res.status(404).send(err);
  }
};

//get a single order By id
exports.getOrderById = async (request, response) => {
  try {
    const order = await Order.findById(request.params.id);
    return response.send(order);
  } catch (err) {
    return response.send(err);
  }
};

//GET A SINGLE order BY BRANDNAME

exports.getOrderByBrandName = async (request, response) => {
  let brandName = request.params.brandName;
  try {
    const order = await Order.find({
      brandName: brandName
    });
    return response.status(200).send(order);
  } catch (err) {
    return response.status(404).send(err);
  }
};

//UPDATE order BY ID

exports.putOrderById = async (req, res) => {
  try {
    console.log("Hit")
    const orderedProducts = req.body.orderedProducts
    const previousOrder = await Order.findById(req.params.productId)
    let eliminatedProductFromPreviousOrderSet = []

    for (let i = 0; i < previousOrder.orderedProducts.length; i++) {
      let productInCurrentOrder = false
      for (let j = 0; j < orderedProducts.length; j++) {
        if (previousOrder.orderedProducts[i].productId == orderedProducts[j].productId) {
          if (previousOrder.orderedProducts[i].productVariantId == orderedProducts[j].productVariantId) {
            productInCurrentOrder = true;
            break;
          }
        }
      }
      if (!productInCurrentOrder) {
        eliminatedProductFromPreviousOrderSet.push(previousOrder.orderedProducts[i]);
      }
    }
    console.log(eliminatedProductFromPreviousOrderSet)
    // order = await Order.findByIdAndUpdate(request.params.productId, {
    //   $set: request.body
    // });
    return res.status(200).send(previousOrder);
  } catch (err) {
    res.status(200).send(err);
  }
};

//Delete order BY ID

exports.deleteOrderById = async (request, response) => {
  try {
    const order = await Order.findById(request.params.productId);
    let result = null;
    if (order) {
      result = await order.remove();
    }
    return response.send(result);
  } catch (error) {
    response.status(404).send(error);
  }
};

async function processOrder(orderedProducts) {
  let valid = true;
  let errorMsg = "";
  let status = 200;
  let totalCost = 0;
  let totalDiscountAmount = 0;
  let totalDiscountPercentage = 0;
  for (let i in orderedProducts) {
    // console.log(orderedProducts[i]);
    let orderedProduct = orderedProducts[i];
    // console.log("quantity==>", orderedProduct.quantity);
    let productVariant = await ProductVariant.findOne({
      "variants._id": orderedProducts[i].productVariantId
    });
    //check if the product variant does not exists.
    if (!productVariant) {
      valid = false;
      status = 404;
      errorMsg =
        "Product variant not found with Id " +
        orderedProducts[i].productVariantId;
      break;
    }
    // console.log("---=-=-=", productVariant);
    let variant = productVariant.variants.find(
      e => e._id == orderedProducts[i].productVariantId
    );

    //check for insufficient quantity.
    if (variant.quantity < orderedProduct.quantity) {
      // console.log("insufficient quantity");
      valid = false;
      status = 400;
      errorMsg =
        "Product variant with Id " +
        orderedProduct.productVariantId +
        " has not enough quantity.Stock = " +
        variant.quantity;
      break;
    }
    // console.log("passed quantity");

    //check for package pricing.
    if (variant.packagePricing) {
      // console.log("inside package pricing.");
      variant.packagePricing = variant.packagePricing.sort((a, b) =>
        a.piece < b.piece ? 1 : -1
      );
      for (let pp in variant.packagePricing) {
        if (variant.packagePricing[pp].piece < orderedProduct.quantity) {
          // console.log("pp matched", variant.packagePricing[pp]);
          //if ordered quantity matches with package price , total cost has to be calculate.
          totalCost +=
            variant.packagePricing[pp].price *
            Math.floor(
              orderedProduct.quantity / variant.packagePricing[pp].piece
            );
          // console.log("cost counting ", totalCost);
          //ordered quantity has to be decreased for further calculation (of discoounts).
          orderedProduct.quantity =
            orderedProduct.quantity % variant.packagePricing[pp].piece;
          // console.log("quantity counting ", orderedProduct.quantity);
        }
      }
    }

    //calculate discount amount.
    if (
      variant.discountAmount &&
      (variant.discountAmount.from <= new Date() &&
        variant.discountAmount.to >= new Date())
    ) {
      totalDiscountAmount +=
        variant.discountAmount.amount * orderedProduct.quantity;
    }

    //check for discount percentage.
    if (
      variant.discountPercentage &&
      (variant.discountPercentage.from <= new Date() &&
        variant.discountPercentage.to >= new Date())
    ) {
      totalDiscountPercentage +=
        ((variant.discountPercentage.amount * variant.price) / 100) *
        orderedProduct.quantity;
    }
    //counting total cost.
    totalCost += variant.price * orderedProduct.quantity;
    if (valid === false) break;
  }
  if (!valid) return { valid: false, errorMsg, status };
  return {
    valid: true,
    totalCost,
    totalDiscountAmount,
    totalDiscountPercentage
  };
}

async function updateProductVariantQuantity(orderedProducts) {
  let updateCount = 0;
  let accident = false;
  let status = 200;
  let errorMsg = "";
  for (let i in orderedProducts) {
    let orderedProduct = orderedProducts[i];
    let productVariant = await ProductVariant.findOne({
      "variants._id": orderedProduct.productVariantId
    });
    let index = 0;

    let variant = productVariant.variants.find((e, i) => {
      if (e._id == orderedProduct.productVariantId) {
        index = i;
        return e;
      }
    });
    //check for insufficient quantity.
    if (variant.quantity < orderedProduct.quantity) {
      status = 400;
      errorMsg =
        "Product variant with Id " +
        orderedProducts[i].productVariantId +
        " has not enough quantity.Stock = " +
        productVariant.variants[v].quantity;
      accident = true;
      break;
    }

    variant.quantity -= orderedProduct.quantity;
    productVariant.variants[index] = variant;

    await productVariant.save();

    updateCount++;
  }
  if (accident) return { accident: true, status, errorMsg, updateCount };
  else return { accident: false, status: 200 };
}

