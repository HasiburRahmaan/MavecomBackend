const { Product, validateProduct } = require("../../models/product/product");
const {
  Department,
  validateDepartment
} = require("../../models/product/department");
const { Brand, validateBrand } = require("../../models/product/brand");
const { Shipping, validateShipping } = require("../../models/product/shipping");
const {
  ProductDescription,
  validateProductDescription
} = require("../../models/product/productDescription");
const {
  ProductVariant,
  validateProductVariant
} = require("../../models/product/productVariant");
const {
  ProductTag,
  validateProductTag
} = require("../../models/product/productTags");
const { Tag, validateTag } = require("../../models/product/tag");
const _ = require("lodash");
const mongoose = require("mongoose");

//Functions
async function findById(id) {
  try {
    var product = await Product.findById(id);
    return product;
  } catch (error) {
    return error;
  }
}

//Add Product
exports.addProduct = async (req, res) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  //separate the core product
  let product = _.pick(req.body, [
    "name",
    "department",
    "category",
    "brandName",
    "model",
    "totalStock",
    "discountAmount",
    "discountPercentage",
    "shortDetails"
  ]);

  //make a product id
  let productId = new mongoose.Types.ObjectId().toString();
  product._id = productId;

  //parse department to JSON, because department is an array
  product.category = JSON.parse(product.category);

  let thumbnailImages = req.files.thumbnailImages.map(file => file.path);
  product.thumbnailImages = thumbnailImages;

  product.priceRange = JSON.parse(req.body.priceRange);

  //separate description and videoUrl.
  let description = _.pick(req.body, ["description", "videoUrl"]);
  description._id = productId;

  //check description.
  const { descriptionError } = validateProductDescription(description);
  if (descriptionError) {
    return res.status(400).send(descriptionError.details.map(e => e.message));
  }

  //add description ref to product.
  product.description = productId;

  //separate shipping information.
  //let dimensions = _.pick(req.body, ["height", "width", "length"]);
  let shipping = _.pick(req.body, ['height', 'width', 'length', 'weight']);
  shipping._id = productId;
  shipping.warehouseAddresses = JSON.parse(req.body.warehouseAddresses);

  //check shipping information.
  const { shippingError } = validateShipping(shipping);
  if (shippingError) {
    console.log(shippingError.details.map(e => e.message));
    return res.status(400).send(shippingError.details.map(e => e.message));
  }

  //add shipping ref to product.
  product.shipping = productId;

  //add variants.
  let variants = JSON.parse(req.body.variants);
  for (let i = 0; i < variants.length; i++) {
    variants[i].images = [];
    variants[i].images[0] = req.files.images[i].path;
    variants[i].createdAt = new Date();
  }

  let productVariant = {
    _id: productId,
    count: variants.length,
    variants: variants
  };

  const { variantError } = validateProductVariant(productVariant);
  if (variantError) {
    console.log(variantError.details.map(e => e.message));
    return res.status(400).send(variantError.details.map(e => e.message));
  }
  console.log("body=======>", product);

  const { productError } = validateProduct(product);
  if (productError)
    res.status(400).send(productError.details.map(e => e.message));

  //separate tags
  let tags = JSON.parse(req.body.taggs);
  tags.length &&
    tags.forEach(async tag => {
      const { tagError } = validateTag(tag);
      if (tagError) res.status(400).send(tagError.details.map(e => e.message));

      let tagId = new mongoose.Types.ObjectId().toString();

      let newTag = new Tag({ value: tag, _id: tagId });
      let productTag = new ProductTag({ tagId, productId });

      //save tag and productTag
      await newTag.save();
      await productTag.save();
    });

  //save description
  description = new ProductDescription(description);
  await description.save();

  //save shipping
  shipping = new Shipping(shipping);
  await shipping.save();

  //save product
  var newProduct = new Product(product);
  newProduct.save();

  //save variants
  productVariant = new ProductVariant(productVariant);

  await productVariant.save();
  return res.status(200).send(productVariant);
};

//Update Product
exports.updateProduct = async (req, res) => {
  // console.log(req.body);
  // return;
  //const { error } = validateProduct(req.body);
  // if (error) {
  //   res.status(400).send(error.details.map(e => e.message));
  // }
  var id = req.params.id;

  let updatedProduct = _.pick(req.body, [
    "name",
    "department",
    "category",
    "brandName",
    "model",
    "totalStock",
    "discountAmount",
    "discountPercentage",
    "shortDetails"
  ]);
  //parse department to JSON, because department is an array
  updatedProduct.category = JSON.parse(updatedProduct.category);
  try {
    var product = await findById(id);
    if (product) {
      product.set(updatedProduct);
      product.updatedAt = new Date();
      await product.save();

      //separate shipping information
      let dimensions = _.pick(req.body, ["height", "width", "length"]);
      let updatedShipping = {
        weight: req.body.weight,
        dimensions: dimensions,
        warehouseAddresses: JSON.parse(req.body.warehouseAddresses)
      };
      // let shipping = await Shipping.findOne({ productId: id });
      await Shipping.updateOne(
        { productId: id },
        {
          $set: updatedShipping
        }
      );
      // console.log("shipping===>", shipping._doc);
      // await shipping.save();

      //separate description and videoUrl
      let updatedDescription = _.pick(req.body, ["description", "videoUrl"]);
      let description = await ProductDescription.findOne({ productId: id });
      description.set(updatedDescription);
      await description.save();

      return res.send(product);
    } else {
      console.log("not found product");
      return res.status(404).send("Product not found with this id");
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

//Get Products
exports.getProducts = async (req, res) => {
  try {
    var products = await Product.find();
    return res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getProductAdditionalInfo = async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await Product.findById(productId).populate("shipping description");
    let tags = await ProductTag.find({ productId }).populate("tagId");
    let variants = await ProductVariant.findById(productId);


    return res.status(200).send({ product, variants: variants.variants, tags });
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get Product By Id
exports.getProductById = async (req, res) => {
  var id = req.params.id;
  try {
    var product = await findById(id);
    // console.log(id)
    return res.send(product);
  } catch (error) {
    return res.status(404).send(error);
  }
};


exports.getHotDepartmentsProducts = async (req, res) => {
  let departments = ["Men", "Women", "Electronics"];
  let Man = ["Clothing", "Sports", "Jwelary"];
  let Woman = ["Clothing", "Jwelary", "Cosmatics"];
  let Electronics = ["phone", "Button", "Accecories"];
  // let products = [];
  let deptProds = [];
  product = await Product.find({
    $and: [
      { department: departments[0] },
      {
        $or: [
          { category: { $elemMatch: { $eq: Man[0] } } },
          { category: { $elemMatch: { $eq: Man[1] } } },
          { category: { $elemMatch: { $eq: Man[2] } } }
        ]
      }
    ]
  });
  let deptProd = {
    departmentName: departments[0],
    categories: Man,
    products: product,
    featureProduct: product[0]
  };
  deptProds.push(deptProd);
  product = await Product.find({
    $and: [
      { department: departments[1] },
      {
        $or: [
          { category: { $elemMatch: { $eq: Woman[0] } } },
          { category: { $elemMatch: { $eq: Woman[1] } } },
          { category: { $elemMatch: { $eq: Woman[2] } } }
        ]
      }
    ]
  });
  deptProd = {
    departmentName: departments[1],
    categories: Woman,
    products: product,
    featureProduct: product[0]
  };
  deptProds.push(deptProd);

  product = await Product.find({
    $and: [
      { department: departments[2] },
      {
        $or: [
          { category: { $elemMatch: { $eq: Electronics[0] } } },
          { category: { $elemMatch: { $eq: Electronics[1] } } },
          { category: { $elemMatch: { $eq: Electronics[2] } } }
        ]
      }
    ]
  });

  deptProd = {
    departmentName: departments[2],
    categories: Electronics,
    products: product,
    featureProduct: product[0]
  };
  deptProds.push(deptProd);

  return res.status(200).send(deptProds);
};
//Get Product By Department Name
exports.getProductByDeptName = async (req, res) => {
  try {
    var products = await Product.find({
      department: req.params.deptname
    });
    return res.status(200).send(products);
  } catch (error) {
    return res.status(404).send(error);
  }
};

//Get Product By brand name
exports.getProductByBrandName = async (req, res) => {
  try {
    var brandName = await Product.find({
      brandName: req.params.brandname
    });
    return res.status(200).send(brandName);
  } catch (error) {
    return res.status(404).send(error);
  }
};

//Get Product By Top Discount
exports.getProductByTopDiscount = async (req, res) => {
  var products = await Product.find().sort({ discountAmount: -1 });
  var topDiscountAmount = products[0].discountAmount;
  // console.log(topDiscountAmount);
  var productsWithTopDiscountAmount = await Product.find({
    discountAmount: topDiscountAmount
  });
  return res.send(productsWithTopDiscountAmount);
};

//Delete Product
exports.deleteProduct = async (req, res) => {
  var id = req.params.id;
  try {
    var product = await findById(id);
    if (product) {
      product.delete();
      return res.send(product);
    } else {
      return res.status(404).send("Product not found with this id");
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};
