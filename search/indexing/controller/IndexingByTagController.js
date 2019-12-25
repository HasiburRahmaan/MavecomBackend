const {ProductListByTag, validateProductListByTag} = require('../model/IndexingByTag')
const {ProductTag} = require('../../../models/product/productTags')
const {Tag} = require('../../../models/product/tag') 

const { createProductListByProductName } = require('../controller/IndexingByProductNameController')

//Function for getting productlist against a single tag id
async function getProductListByTagId(tagId){
    var tag = tagId  
   
    var productList = await ProductTag.find({tagId:tag}).select('productId -_id')
    console.log(productList)
    // console.log(await Tag.findById(tag).select("value -_id"), productList) 
    return productList ? productList : null  
} 

//Function for get product list by tag name 
async function getProductListByTagName(tag){
    list = null 
    if (tag!=null){
        tag = tag.toLowerCase()
        list =  await ProductListByTag.find({tag}).select('productList -_id') 
    }
    // console.log(tag, list.length) 
    return list.length? list[0] : null  
}


//Function for updating ProductListByTag
 async function createProductListByTag(){
     //get every existing tag 
    var tagList = await Tag.find()
    for(var i=0; i<tagList.length; i++){
        
        var tag = tagList[i]
        var productList = await getProductListByTagId(tag.id) 
 
        //Updating Table
        var tableTag = await ProductListByTag.find({tag:tag.value})
        if(tableTag.length){
            var value = tableTag[0]
            value.productList = productList 
            console.log("value: ", value)
            await value.save() 
        }else{
            var objectSchema = {
                tag: tag.value,
                productList
            }  
            // console.log(objectSchema)
            // objectSchema.productList = JSON.stringify(objectSchema.productList)
            // const {error} = validateProductListByTag(objectSchema)
            // if(error){
            //     console.log("schema: ",objectSchema)    
            //     // console.log(error)
            // }else{ 
                var object = ProductListByTag(objectSchema) 
                await object.save()  
                console.log("object: ", object)
            // }
        }
    } 
}  


exports.updateProductListByTagTable = async (req, res)=>{
    // console.log("tag")
    try {
        await createProductListByProductName()
        await createProductListByTag() 
        res.status(200).send("updated")
    } catch (error) { 
        console.log(error)
        res.send(error)
    }
}


// var object = {
//     id : "id",
//     var : [
//         {
//             id : "asdf"
//         },
//         {
//             id : "asdfdsd"
//         }
//     ] 
// }
// object.var.id = JSON.stringify(object.var.id)
// console.log(object)
