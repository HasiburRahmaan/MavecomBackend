const { SellerOrders, totalOrderValidator, singleOrderValidator } = require("../../models/seller/sellerOrders")

const { Product } = require("../../models/product/product")




function validateSellerTotalOrder(object, response) {
    const { error } = totalOrderValidator(object);
    if (error) {
        response.status(404).send(error.details.map(e => e.message))
        return false
    } else return true
}
function validateSellerSingleOrder(object, response) {
    const { error } = singleOrderValidator(object);
    if (error) {
        response.status(404).send(error.details.map(e => e.message))
        return false
    } else return true
}


async function addOrderOnTotalSellOfSeller(object, response) {
    let sellerOrder = await SellerOrders.findById(object._id)
    // console.log("SellerOrder====>", sellerOrder)
    if (sellerOrder) {
        // if (!validateSellerSingleOrder(object.order, response)) return null
        sellerOrder.orders.push(object.order)
    } else {
        let order = {
            _id: object._id,
            orders: [
                { ...object.order }.doc ? { ...object.order }.doc : { ...object.order }
            ]
        }
        // if (!validateSellerTotalOrder(order, response)) return null

        sellerOrder = new SellerOrders(order)
    }
    console.log(sellerOrder)
    return sellerOrder
}


exports.addOrderOnTotalSell = async (req, res) => {
    try {
        await addOrderOnTotalSellOfSeller(req.body)
    } catch (error) {

    }
}

const getAllOrderInfomationOfSellerBySellerId = async (req, res) => {

    try {
        let id = req.params.seller_id;
        console.log("SellerId: ", id)
        let orderInformationOfSeller = await SellerOrders.findById(id)
        return orderInformationOfSeller ? res.status(200).send(orderInformationOfSeller) : res.status(404).send("")
    } catch (error) {
        console.log("getAllOrderInfomationOfSellerBySellerId====>", error)
        return res.status(404).send("Error", error)
    }
}

module.exports = { addOrderOnTotalSellOfSeller, validateSellerSingleOrder, validateSellerTotalOrder, getAllOrderInfomationOfSellerBySellerId }