const {SimilarProduct, validateSimilarProduct} = require('../model/recommendationBySimilarProduct')
const {Product} = require('../../models/product/product') 
const {ProductTag} = require('../../models/product/productTags')




async function findTagListOfProduct(productId){
    var tagList = await ProductTag.find().where({productId}).select("tagId -_id") 
    return tagList.length? tagList : null
}

function compareTwoProductByTagList(productOneTagList, productTwoTagList){
    var count = 0
    productOneTagList.map(tag=>{
        productTwoTagList.map(e=>{
            if(tag.tagId.toString() == e.tagId.toString()){
                count++
            }
        })
    }) 
    // var result = (count/productOneTagList.length) * 100 
    var result = (2*count)/(productOneTagList.length+productTwoTagList.length) //dice coefficient similarity measure
    return result
}


function containProduct(productList, productId){
    var result = false 
    var len = productList.length 
    for(var i = 0; i<len; i++){
        if(productId.toString() == productList[i].product.toString()){
            result = true
            break
        }
    }
    return result 
}

async function findSimilarProductBasedOnTag(){
    var productList =  await Product.find().select("_id")
    var len = productList.length


    for(var i = 0; i<len; i++){
        // console.log("I: =======================", i)
        var product = productList[i] 
        var productTagList = await findTagListOfProduct(product.id) 
    
        var productArray = []
        var result 
        var similarProduct = await SimilarProduct.findOne().where({productId:product.id}) 
        if(similarProduct){
            // console.log(similarProduct)
            productArray = similarProduct.productList
        }
         
        for(var j = 0; j< len; j++){
            // console.log("J: ",j)
            //console.log("Product One: ",product,"\narray: ", productArray,"\nproductTwo", productTwo) 
            var productTwo = productList[j] 
            var hasProductOnProductArray = containProduct(productArray, productTwo.id)
            if(product.id != productTwo.id && !hasProductOnProductArray ){
                var productTwoTagList = await findTagListOfProduct(productTwo.id) 
                result = compareTwoProductByTagList(productTagList, productTwoTagList)  
                
                if(result > .7){
                    // console.log(product, productTwo, result)
                    if(similarProduct)
                        productArray.productList.push({product: productTwo.id}) 
                    else{
                        productArray.push({product: productTwo.id})
                    }
                }
            }
        } 
        if(similarProduct){ 
            similarProduct.productList = productArray     
            await similarProduct.save()
        }else{ 
            if(productArray.length){
                var objectSchema = {
                    productId:product.id,
                    productList:productArray
                }  
                // var {error} = validateSimilarProduct(objectSchema) 
                // if(error){
                //     console.log(error) 
                // }else{
                    await new SimilarProduct(objectSchema).save()
                // }
            } 
        }
    }
} 


exports.updateSimilarProduct = async(req, res)=>{
    try {
        await findSimilarProductBasedOnTag() 
        res.send("updated")
    } catch (error) {
        res.status(404).send(error)
    }
} 

exports.getAllSimilarProduct = async (req, res)=>{
    try {
        var similarProducts = await SimilarProduct.find() 
        res.send(similarProducts)
    } catch (error) {
        res.send(error) 
    }
} 

exports.getSimilarProductByProductId = async (req, res)=>{
    try {
        var id = req.params.id 
        var similarProduct = await SimilarProduct.find().where({productId:id}) 
        res.send(similarProduct) 
    } catch (error) {
        res.send(error)
    }
}

