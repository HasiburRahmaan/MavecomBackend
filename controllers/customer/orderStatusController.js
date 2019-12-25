const _ = require("lodash");
const {
	OrderStatusInfo,
	validateOrderStatusInfo
} = require("../../models/customer/orderStatus");


exports.addOrderStatusInfo = async (req, res) => {
	const { error } = validateOrderStatusInfo(req.body);
	if (error) return res.status(400).send(error.details.map(e => e.message));

	const orderStatusInfo = new OrderStatusInfo(req.body);
	orderStatusInfo.save();
	return res.status(200).send(req.body);
}

exports.getAllOrderStatusInfo = async (req, res) => {
	var orderStatusInfo = await OrderStatusInfo.find();
	return res.status(200).send(orderStatusInfo);
}

exports.getOrderStatusInfoByCustomerId = async (req, res) => {
	var orderStatusInfo = await OrderStatusInfo.findOne({ customerId: req.params.customerId });
	if (orderStatusInfo) {
		res.status(200).send(orderStatusInfo);
	} else {
		res.status(404).send("order Status not found by this customer")
	}
}