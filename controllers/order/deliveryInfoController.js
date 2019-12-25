const _ = require("lodash");
const { validateDeliveryInfo, DeliveryInfo } = require("../../models/order/deliveryInfo");

exports.addDeliveryInfo = async (req, res) => {
    const { error } = validateDeliveryInfo(req.body);
    if (error) return res.status(400).send
        (error.details.map(e => e.message));

    const deliveryInfo = new DeliveryInfo(req.body);
    deliveryInfo.save();
    return res.status(200).send(req.body);
}

exports.getAllDeliveryInfo = async (req, res) => {
    try {
        const deliveryInfo = await DeliveryInfo.find();
        return res.status(200).send(deliveryInfo);
    } catch (err) {
        res.status(404).send(err);
    }
}

//get a single order By id
exports.getAllDeliveryInforById = async (req, res) => {
    try {
        const deliveryInfo = await DeliveryInfo.findById(req.params.id).populate({ path: "address" });
        return res.send(deliveryInfo);
    } catch (err) {
        return res.send(err);
    }
};