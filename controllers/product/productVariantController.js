const {
  ProductVariant,
  validateProductVariant
} = require("../../models/product/productVariant");

//Function
async function findById(id) {
  try {
    var ProductVariant = await ProductVariant.findById(id);
    return ProductVariant;
  } catch (error) {
    return error;
  }
}

//Create ProductVariant
exports.addProductVariant = async (req, res) => {
  const { error } = validateProductVariant(req.body);
  if (error) {
    res.status(400).send(error.details.map(e => e.message));
  }
  var productVariant = new ProductVariant(req.body);
  await productVariant.save();
  res.status(200).send(productVariant);
};

//Get all ProductVariant
exports.getAllProductVariant = async (req, res) => {
  try {
    var productVariant = await ProductVariant.find();
    // console.log(productVariant)
    return res.send(productVariant);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getProductVariantById = async (req, res) => {
  try {
    let id = req.params.id
    var productVariant = await ProductVariant.findById(id);
    return res.send(productVariant);
  } catch (error) {
    return res.status(404).send(error);
  }
};

//Get Product By product and variant id
exports.getProductByProductAndVairantId = async (req, res) => {
  try {
    console.log("hit")
    let productVariant = await ProductVariant.findById(req.params.productId)
    let variant = productVariant.variants.filter(e => e._id.toString() == req.params.variantId)[0]
    return variant ? res.status(202).send(variant) : res.status(404).send("")
  } catch (error) {
    console.log("getProductByProductAndVairantId==>", error)
    res.status(404).send("")
  }
}

//Update ProductVariant
exports.updateProductVariant = async (req, res) => {
  let variant = req.body; //JSON.parse(req.body.variant);
  // console.log(req.body);
  // const { error } = validateProductVariant(req.body);
  // if (error) {
  //   console.log(error.details.map(e => e.message));
  //   return res.status(400).send(error.details.map(e => e.message));
  // }
  let id = req.params.id;

  try {
    await ProductVariant.findOneAndUpdate(
      {
        variants: {
          $elemMatch: { _id: id }
        }
      },
      { $set: { "variants.$": variant } },
      // { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    );
    // await ProductVariant.save();
    return res.status(200).send(req.body);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

//Delete ProductVariant
exports.deleteProductVariant = async (req, res) => {

  try {
    var id = req.params.id;
    var ProductVariant = await findById(id);

    if (ProductVariant) {
      ProductVariant.delete();
      return res.send(ProductVariant);
    } else {
      return res.status(404).send("ProductVariant not found with this id");
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};
