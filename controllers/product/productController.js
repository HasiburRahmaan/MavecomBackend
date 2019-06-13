const {Product, validateProduct} = require('../../models/product/product'); 
const {Department, validateDepartment} = require('../../models/product/department');
const {Brand, validateBrand} = require('../../models/product/brand');

//Functions
async function findById(id){
    try{
        var product =  await Product.findById(id);
        return product
    }catch(error){
        return error
    }
}


//Add Product
exports.addProduct = async(req, res) =>{ 

    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
        res.status(400).send(error);
    }

    const imageUrl = req.file.path;
    delete req.file;
    req.body.assets.thumbnail_images.src = imageUrl;
   
    const {error} =  validateProduct(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }

    var product = new Product(req.body);
    await product.save();
    res.status(200).send(product)    
}

//Get Products
exports.getProducts = async(req, res)=>{
    try {
        var products = await Product.find();
        console.log("products")
        return res.send(products);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//Get Product By Id
exports.getProductById = async(req, res)=>{
    var id = req.params.id;
    try {
        var product =await findById(id)
        // console.log(id)
        return res.send(product); 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Get Product By Department Name 
exports.getProductByDeptName = async(req, res)=>{
    try {
        var dept = await Department.find({name:req.params.deptname});  
        try {
            var products = await Product.find({department: dept[0].id}); 
            console.log(dept)  
            return res.send(products);
        } catch (error) {
            return res.send(error); 
        }
    } catch (error) {
        console.log(error);
        return res.send("Department not found with this name");
    } 
}

//Get Product By brand name
exports.getProductByBrandName = async(req, res)=>{
    try {
        var brandName = req.params.brand; 
        var products = Product.find({brandName})
        return res.send(products) 
    } catch (error) {
        return error
    }
}

//Get Product By Top Discount
exports.getProductByTopDiscount = async(req, res)=>{
    var products = await Product.find().sort({discountAmount: -1}); 
    var topDiscountAmount = products[0].discountAmount;
    console.log(topDiscountAmount)  
    var productsWithTopDiscountAmount = await Product.find({discountAmount: topDiscountAmount})             
    return res.send(productsWithTopDiscountAmount); 
} 


//Update Product
exports.updateProduct = async(req, res)=>{
    const {error} = validateProduct(req.body) 
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var product =await findById(id)
        if(product){
            product.set(req.body);
            product.updatedAt = new Date();
            await product.save();
            return res.send(product); 
        }else{
            return res.status(404).send("Product not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}


//Delete Product
exports.deleteProduct = async (req, res)=>{
    var id = req.params.id;
    try {
        var product =await findById(id)
        if(product){
            product.delete();
            return res.send(product); 
        }else{
            return res.status(404).send("Product not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}