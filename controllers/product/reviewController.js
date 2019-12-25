const mongoose = require('mongoose')
const {
    ProductReview,
    validateProductReview,
    validateSingleReview
} = require('../../models/product/review')

const { Customer } = require("../../models/customer/customer")
const { Order } = require('../../models/order/order')
const { Product } = require('../../models/product/product')


//Find Product Review by product id
// async function findReviewByProductId(id) {
//     try {
//         return ProductReview.findById(id) ?  ProductReview.findById(id) :  
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }

//Generating Customer 
async function customerGenerator(customerId) {
    var customer = await Customer.findById(customerId);
    var customerSchema = {}
    customerSchema._id = customerId
    customerSchema.name = customer.fullName
    customerSchema.profilePicture = customer.images[0] ? customer.images[0] : "default link"//default link will be added
    return customerSchema;
}

//Generating Single Review
async function singleReviewGenerator(body) {
    let review = {
        _id: body.customer_id,
        customer: body.customer_id,
        comment: body.comment,
        rating: body.rating
    }
    // console.log("Review Generator====>", review)
    return review
}
//Generating Total Review 
async function reviewGenerator(body) {
    let review = {
        _id: body._id,
        reviews: [
            await singleReviewGenerator(body)
        ],
        reviewSummery: {
            totalRating: 0,
            totalReview: 0,
            ratings: {
                "5": 0,
                "4": 0,
                "3": 0,
                "2": 0,
                "1": 0
            }
        },
        userList: []
    }
    return review
}
//Update review
function updateReviewSummeryAndUserList(review, body) {
    review.reviewSummery.totalRating = Number(review.reviewSummery.totalRating) + Number(body.rating);
    review.reviewSummery.totalReview = Number(review.reviewSummery.totalReview) + 1;
    review.reviewSummery.ratings[body.rating] = Number(review.reviewSummery.ratings[body.rating]) + 1;
    review.userList.push(body.customer_id.toString())
    return review
}

function deleteUserReviewFromReviewSummery(review, userReview) {
    // console.log("userReview from delte userRevuew====>", userReview)
    review.reviewSummery.totalRating = Number(review.reviewSummery.totalRating) - Number(userReview.rating);
    review.reviewSummery.totalReview = Number(review.reviewSummery.totalReview) - 1;
    review.reviewSummery.ratings[userReview.rating] = Number(review.reviewSummery.ratings[userReview.rating]) - 1;
    review.userList = review.userList.filter(e => e.toString() != userReview.customer.toString())

    return review
}

//Modify Review

async function modifyReview(data) {
    for (let i in data) {
        let customer = await customerGenerator(data[i].customer);
        let newData = { ...data[i]._doc };
        newData.customer = customer;
        data[i] = newData;
    }
    return data;
}

//Get user list who has given review
async function getUserList(productId) {
    let userList = await ProductReview.findById(productId).select("userList -_id")
    return userList.userList.length ? userList.userList : null
}



//Check Review for error/validity
function checkValidity(review, response) {
    // console.log(review)
    const { error } = validateProductReview(review);
    if (error) {
        console.log("error")
        response.status(404).send(error.details.map(e => e.message));
        return false;
    }
    return true;
}

function checkValidityForSingleReview(review, response) {
    const { error } = validateSingleReview(review);
    if (error) {
        console.log("error")
        response.status(404).send(error.details.map(e => e.message));
        return false;
    }
    return true;
}


//Create
exports.createProductReview = async (req, res) => {
    let result = await ProductReview.findById(req.body._id)
    if (result) {
        let userList = await getUserList(req.body._id)
        // console.log(userList)
        if (userList && userList.includes(req.body.customer_id)) {
            return res.status(409).send("user already gave review")
        } else {
            let review = await singleReviewGenerator(req.body)

            if (!checkValidityForSingleReview(review, res)) return

            result.reviews.push(review)
            result = updateReviewSummeryAndUserList(result, req.body)
            await result.save()
            res.status(201).send(result)
        }
    } else {
        try {
            if (await Product.findById(req.body._id)) {
                let review = await reviewGenerator(req.body)
                review = updateReviewSummeryAndUserList(review, req.body)

                if (!checkValidity(review, res)) return;

                await new ProductReview(review).save()
                return res.send(ProductReview(review))
            } else {
                return res.status(404).send("Product not found")
            }
        } catch (error) {
            console.log(error)
            return res.status(404).send(error)
        }
    }
}


//Read
exports.getAllProductReview = async (req, res) => {
    try {
        let test = await ProductReview.find().populate("reviews.customer", "_id fullName images")
        // console.log(test.length)
        return test.length ? res.status(200).send(test) : res.status(404).send("")
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}



exports.getProductReviewByProductId = async (req, res) => {
    try {
        let productReview = await ProductReview.findById(req.params.id)//.populate("reviews.customer", "_id fullName images") 

        let reviews = await modifyReview(productReview._doc.reviews);
        let modifiedProductReview = { ...productReview._doc, reviews };

        if (modifiedProductReview) {
            return res.send(modifiedProductReview)
        } else { res.status(404).send("") }
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}


//Update

exports.updateSingleReviewOfProduct = async (req, res) => {
    try {
        let review = await ProductReview.findById(req.body._id)
        let userReview
        review.reviews = review.reviews.filter(e => {
            if (e._id == req.body.customer_id) {
                userReview = e
            } else {
                return true
            }
        })
        if (userReview) {
            review = deleteUserReviewFromReviewSummery(review, userReview);
            let singleReview = await singleReviewGenerator(req.body)
            if (!checkValidityForSingleReview(singleReview, res)) return
            review.reviews.push(singleReview)
            review = updateReviewSummeryAndUserList(review, req.body)
            await review.save()
            return res.status(202).send(review)
        } else {
            return res.status(404).send("")
        }

    } catch (error) {
        console.log("Update==>", error)
        return res.send(error)
    }
}


//Delete
exports.deleteSingleReviewOfProduct = async (req, res) => {
    try {
        let review = await ProductReview.findById(req.body.productId);
        let userReview
        review.reviews = review.reviews.filter(e => {
            if (e._id == req.body.reviewId) {
                userReview = e
            } else {
                return true
            }
        })
        if (userReview) {
            review = deleteUserReviewFromReviewSummery(review, userReview);
            await review.save()
            return res.send(review)
        } else {
            return res.status(404).send("")
        }
    } catch (error) {
        console.log(error)
        return res.status(404).send(error)
    }
}