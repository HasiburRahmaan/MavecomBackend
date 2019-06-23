const {ProductListByTag, validateProductListByTag} = require('../model/tagProdcutList')
const {ProductTag} = require('../../models/product/productTags')
const {Tag} = require('../../models/product/tag') 



//Function for getting productlist against a single tag
function getProductListByTag(tagId){
    var tag = tagId  
    var productList =  ProductTag.find({tagId:tag}).select('productId -_id')
    return productList ? productList : null  
} 

//Function for get product list by tag name 
async function getProductListByTagName(tag){
    if (tag.length)
        tag = tag.toLowerCase()
    var list =  await ProductListByTag.find({tag}).select('productList -_id') 
    return list ? list[0] : null  
}



 async function createProductListByTag(){
     //get every existing tag 
    var tagList = await Tag.find()
    
    for(var i=0; i<tagList.length; i++){
        
        var tag = tagList[i]
        var productList = await getProductListByTag(tag.id)
        // console.log(tag.value,"\n", productList) 
        //Updating Table
        var tableTag = await ProductListByTag.find({tag:tag.value})
        // console.log(tableTag)
        if(tableTag.length){
            var value = tableTag[0]
            value.productList = productList 
            // console.log(value) 
            value.save() 
        }else{
            var objectSchema = {
                tag: tag.value,
                productList
            } 
            var object = ProductListByTag(objectSchema)
            await object.save()
        }
        
    }
}  

function intersectedProducts(productArray){

   var res = new Set(productArray[0]);
   var intersectedResult = productArray[0]
   var len = productArray.length
   for(var i = 0; i< len-1; i++){
        var arr = productArray[i+1]
        intersectedResult =  arr.filter(e=>{
            // console.log( res.has(e) ) 
            return res.has(e)
        }) 
        // console.log(intersection)
        res = new Set(intersectedResult) 
    }

    return intersectedResult
}


exports.updateProductListByTagTable = (req, res)=>{
    createProductListByTag()
    res.status(200).send("updated")
}


exports.searchQueries = async (req, res) =>{
    var queries = req.query.queries.split(" ")
    var searchResults = [] 

    for(var i = 0; i<queries.length; i++){
        var products = await getProductListByTagName(queries[i])  
        var localArray = []
        products.productList.map(e=>{
            localArray.push(e.productId.toString())
        }) 
        searchResults.push(localArray) 
    }
    // console.log(searchResults)  
    var result = intersectedProducts(searchResults)
    // console.log(result)
    res.send(result);    
} 



// createProductListByTag()

// function func(){
//     let test = {
//         tag: "Black",
//         productList: [
//             {
//                 product: '5cff730edbd4c6484f8f833f',
//             },{
//                 product:  "5cff730edbd4c6484f8f833f"
//             }
//         ]
//     } 
//     test = new ProductListByTag(test);
//     // test.save().then(res=>console.log(res)).catch(err=>console.log("error==>",err));
// } 
// func() 
 

// createProductListByTag()  

// =========================//

// console.log("test\n=====================", )

// var arr1 = [1, 2, 3, "asdf", 3, 5]
// // console.log(arr1) 
// var arr2 = new Set([1, 3, 5, 7, "asdf" ]) 
// var intersection = new Set(arr1.filter( e =>{
//     return arr2.has(e)
// }) ) 
// // console.log(arr2 )
// // console.log(intersection) 

// console.log(arr2.has(3))



