// const { ProductListByProductName, validateProductListByProductName } = require('../model/IndexingByProductName') 
const  {Product} = require('../../../models/product/product') 
const {Tag, validateTag } = require('../../../models/product/tag') 
const {ProductTag, validateProductTag} = require('../../../models/product/productTags')
const {ProductListByTag, validateProductListByTag} = require('../model/IndexingByTag')

//update tag table
async function updateTagList(tag){
   
    var result = await Tag.find().where({value:tag}) 
    if(result.length){
        //Do nothing
    }else{
        const objectSchema = {
            value: tag
        }
        const {error} = validateTag(objectSchema) 
        if(error){
            
        }else{
            tag = new Tag(objectSchema)
            await tag.save()
        }
    } 
}

//update ProductTag table
async function updateProductTag(productId, tag){
    var tagId = await Tag.findOne().where({value:tag}) 
    if(tagId){
        tagId = tagId.id
        var productTag = await ProductTag.find().where({productId, tagId}) 
        if(productTag.length){
            //Do nothing
        }else{
            var objectSchema = {
                productId,
                tagId
            } 
            var {error} = validateProductTag(objectSchema) 
            if(error){
                console.log(error)
            }else{
                var productTag = new ProductTag(objectSchema)
                await productTag.save()
            }
        } 
    }
    
    
    
} 

//Function for create/update ProductListByProductName
async function createProductListByProductName(){
    
    var productList = await Product.find().select("name _id")
    for(var i = 0; i<productList.length; i++){
        var product = productList[i] 
        var productNameList = product.name.split(" ")

        for(var j = 0; j<productNameList.length; j++){
            var tag = productNameList[j].trim().toLowerCase() 
            await updateTagList(tag) 
            await updateProductTag(product.id, tag)
            // var value = await ProductListByProductName.find().where({tag}) //comment out if index by name
            // var value = await ProductListByTag.find().where({tag}) 
            // if(value.length){
            //     var containProduct = false 
            //     var len = value[0].productList.length

            //     for(var k = 0; k<len; k++){
            //         if(value[0].productList[k].productId == product.id){
            //             containProduct = true
            //             break
            //         }
            //     }
            //     if(containProduct){
            //         //do nothing because productlist already contains product id
            //     }else{
            //         value[0].productList.push({productId: product.id}) 
            //         await value[0].save() 
            //     } 

            // }else{
            //     var objectSchema = {
            //         tag,
            //         productList:[
            //             {productId: product.id}
            //         ]
            //     } 
            //     // const {error} = validateProductListByProductName(objectSchema) //comment out if index by name
            //     const {error} = validateProductListByTag(objectSchema)
            //     if(error){
            //         console.log(error)
            //     }else{
            //         // value = new ProductListByProductName(objectSchema) //comment out if index by name
            //         value = new ProductListByTag(objectSchema)
                   
            //         await value.save()
            //     }
            // }    
        }

    }  
} 
// createProductListByProductName()
// exports.updateProductListByProductName = (req, res)=>{
//     try {
//         createProductListByProductName()
//         res.status(200).send("updated")
//     } catch (error) {
//         res.status(404).send(error) 
//     }
// } 



module.exports = {createProductListByProductName} 