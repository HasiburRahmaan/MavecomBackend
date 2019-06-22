const {ProductListByTag, validateProductListByTag} = require('../model/tagProdcutList')
const {ProductTag} = require('../../models/product/productTags')
const {Tag} = require('../../models/product/tag') 



//Function for getting productlist against a single tag
function getProductListByTag(tagId){
    var tag = tagId  
    var productList =  ProductTag.find({tagId:tag}).select('productId -_id')
    return productList ? productList : null  
} 

function getProductListByTagName(tag){
    var productList =  ProductListByTag.find({tag})[0]
    return productList ? productList : null  
}



 async function createProductListByTag(){
     //get every existing tag 
    var tagList = await Tag.find()
    
    for(var i=0; i<tagList.length; i++){
        
        var tag = tagList[i]
        var productList = await getProductListByTag(tag.id)

        //Updating Table
        var tableTag = await ProductListByTag.find({tag:tag.value})
        if(tableTag.length){
            var value = tableTag[0]
            value.productList[0] = productList
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




exports.updateProductListByTagTable = (req, res)=>{
    createProductListByTag()
    res.status(200).send("updated")
}


exports.searchQueries = async (req, res) =>{

    // console.log(req.query.queries)

    var queries = req.query.queries.split(" ")
    var searchResults = [] 

    for(var i = 0; i<queries.length; i++){
        searchResults[i] = await getProductListByTagName(queries[i])
    }

    console.log(searchResults[0])

    res.send(searchResults); 
}








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


 