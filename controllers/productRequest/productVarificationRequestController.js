const _ = require("lodash");

const {
    validateProductVarificationRequest,
    ProductVarificationRequest
} = require("../../models/ProductRequest/productVarificationRequest")


//post a productVarificationRequest
exports.addProductVarificationRequest = async (req, res) => {
    const {
        error
    } = validateProductVarificationRequest(req.body);

    if (error)
        return res.status(400).send(error.details.map(e => e.message));

    const productVarificationRequest = new ProductVarificationRequest(req.body);
    productVarificationRequest.save();
    return res.status(200).send(req.body);
}

//get all productVarificationRequest
exports.getAllProductVarificationRequest = async (req, res) => {
    try {
        const productVarificationRequest = await ProductVarificationRequest.find().populate(
            "productVarificationRequest",

        );
        return res.status(200).send(productVarificationRequest);

    } catch (err) {
        res.status(404).send(err);
    }
}

//get  productVarificationRequest by  id
exports.getProductVarificationRequestsById = async (request, Response) => {
    try {
        const productVarificationRequest = await ProductVarificationRequest.findById(request.params.productId);
        return response.send(productVarificationRequest);
    } catch (err) {
        return response.send(err);
    }
}

//get productVarificationRequest by brandname
exports.getProductVarificationRequestBybrandName = async (request, response) => {
    let brandName = request.params.brandName;
    try {
        const productVarificationRequest = await ProductVarificationRequest.find({
            brandName: brandName
        });
        return response.status(200).send(productVarificationRequest);
    } catch (err) {
        return response.status(404).send(err);
    }
}

//update  productVarificationRequest id
exports.putProductVarificationRequestById = async (request, response) => {
    try {
        const productVarificationRequest = await ProductVarificationRequest.findByIdAndUpdate(request.params.productId, {
            $set: request.body
        });
        return response.status(200).send(productVarificationRequest)
    } catch (err) {
        response.status(200).send(err)
    }
}


//delete  productVarificationRequest id
exports.deleteProductVarificationRequestById = async (request, response) => {
    try {
        const productVarificationRequest = await ProductVarificationRequest.findById(request.params.productId);
        let result = null;
        if (productVarificationRequest) {
            result = await productVarificationRequest.remove();
        }
        return response.send(result);
    } catch (error) {
        response.status(404).send(error);
    }
}