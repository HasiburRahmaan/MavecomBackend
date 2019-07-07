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
    
    var result = (count/productOneTagList.length) * 100 
    return result
}



async function findSimilarProductBasedOnTag(){
    var productList =  await Product.find().select("_id")
    var len = productList.length
    for(var i = 0; i<len; i++){
        var product = productList[i] 
        var productTagList = await findTagListOfProduct(product.id)
        var productArray = []
        var result
        for(var j = 0; j< len; j++){
            var productTwo = productList[j] 
            if(product.id != productTwo.id){
                var productTwoTagList = await findTagListOfProduct(productTwo.id) 
                result = compareTwoProductByTagList(productTagList, productTwoTagList)  
                if(result > 70){
                    // console.log(product, productTwo, result)
                    productArray.push(productTwo)
                }
            }
        } 
    }
} 

findSimilarProductBasedOnTag() 

exports.updateSimilarProduct = async(req, res)=>{
    findSimilarProductBasedOnTag()
}