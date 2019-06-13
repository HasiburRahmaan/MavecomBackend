const _ = require("lodash");
const {
    validateproductUpdateRequest,
    ProductUpdateRequest
}=require("../../models/ProductRequest/productUpdateRequest")

//post a productUpdateRequest
exports.addProductUpdateRequest = async (req, res) => {
    const {
        error
    } = validateproductUpdateRequest(req.body);

    if (error)
        return res.status(400).send(error.details.map(e => e.message));

    const productUpdateRequest = new ProductUpdateRequest(req.body);
    productUpdateRequest.save();
    return res.status(200).send(req.body);
}

//get all productUpdateRequest
exports.getAllProductUpdateRequest = async (req, res) => {
    try {
        const productUpdateRequests = await ProductUpdateRequest.find();
        return res.status(200).send(productUpdateRequests);

    } catch (err) {
        res.status(404).send(err);
    }
}

//get productRequestUpdateRequest by id
exports.getProductUpdateRequestById=async(request,Response)=>{
       try {
           const productUpdateRequest = await ProductUpdateRequest.findById(request.params.productId);
           return response.send(productUpdateRequest);
       } catch (err) {
           return response.send(err);
       }
}

//get productUpdateRequest by brandname
exports.getProductUpdateRequestByName = async (request, response) => {
    let brandName = request.params.brandName;
    try {
        const productUpdateRequest = await ProductUpdateRequest.find({
            brandName: brandName
        });
        return response.status(200).send(productUpdateRequest);
    } catch (err) {
        return response.status(404).send(err);
    }
}

//update productupdateRequest by id
exports.putProductUpdateRequestById = async (request, response) => {
    try {
        const productUpdateRequest = await ProductUpdateRequest.findByIdAndUpdate(request.params.productId, {
            $set: request.body
        });
        return response.status(200).send(productUpdateRequest)
    } catch (err) {
        response.status(200).send(err)
    }
}

//delete productupdateRequest  by id
exports.deleteProductUpdateRequestById = async (request, response) => {
    try {
        const productUpdateRequest = await ProductUpdateRequest.findById(request.params.productId);
        let result = null;
        if (productUpdateRequest) {
            result = await productUpdateRequest.remove();
        }
        return response.send(result);
    } catch (error) {
        response.status(404).send(error);
    }
}