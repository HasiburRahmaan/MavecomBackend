const { Cart, validateCart, validateProduct } = require('../../models/user/cart')
const { ProductVarient } = require('../../models/product/productVariant')
const _ = require("lodash")

function errorCheckForCart(object, response) {
    const { error } = validateCart(object);
    if (error) {
        response.status(404).send(error.details.map(e => e.message))
        console.log(error)
        return true
    } else {
        return false
    }
}
function errorCheckForSingleProduct(object, response) {
    const { error } = validateProduct(object);
    if (error) {
        response.status(404).send(error.details.map(e => e.message))
        console.log(error)
        return true
    } else {
        return false
    }
}

function productOnCartProductArray(userCartData, product) {
    let result = false;
    userCartData.products.map(e => {
        if (e.productId == product.productId && e.varientId == product.varientId) {
            result = true
        }
    })
    return result
}

exports.addSingleProductOnCart = async (req, res) => {
    try {
        let userCartData = await Cart.findById(req.body._id);
        // console.log("=====>", userCartData)
        if (userCartData) {
            if (errorCheckForSingleProduct(req.body.product, res)) return

            if (!productOnCartProductArray(userCartData, req.body.product)) {
                userCartData.products.push(req.body.product)
                await userCartData.save()
            }
            return res.status(202).send(userCartData)
        } else {
            let obj = {
                _id: req.body._id,
                products: [
                    req.body.product
                ]
            }
            if (errorCheckForCart(obj, res)) return
            await new Cart(obj).save()
            return res.status(202).send("")
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.readUserCartData = async (req, res) => {
    try {
        let cartData = await Cart.findById(req.body._id)
        let test = await ProductVarient.findById("5d9dd06222bda03ed14df4bc")
        test = { ...test }._doc

        let variant = test.variants[0]
        // console.log(variant)
        if (cartData) {
            return res.status(202).send(cartData)
        } else {
            return res.status(404).send("")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.updateCart = async (req, res) => {
    try {
        let userCartData = await Cart.findById(req.body._id);
        userCartData.products = req.body.products
        await userCartData.save()
        res.status(202).send("")
    } catch (error) {
        res.status(500).send("error", error)
    }
}


