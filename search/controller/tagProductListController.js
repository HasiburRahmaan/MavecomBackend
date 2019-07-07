const {ProductListByTag, validateProductListByTag} = require('../indexing/model/IndexingByTag')
const {ProductTag} = require('../../models/product/productTags')
const {Tag} = require('../../models/product/tag') 
const {distanceBetweenWords} = require('../error-correction/levenshteinAlgorithm')

//Function for get product list by tag name 
async function getProductListByTagName(tag){
    list = null 
    if (tag!=null){
        tag = tag.toLowerCase().trim()
        list =  await ProductListByTag.find({tag}).select('productList -_id') 
    }
    // console.log(tag, list.length) 
    return list.length? list[0] : null  
}


//Function for intersecting arrays 
function intersectedProducts(productArray){
    var intersectedResult = null
    if(productArray.length){
        var res = new Set(productArray[0]);
        intersectedResult = productArray[0]
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
    }

    return intersectedResult
}


 async function getTagListForWrongKeyword(keyword){
    var tagList = await Tag.find() 
    var suggestedTagList = [] 
    tagList.map(e=>{
        if(distanceBetweenWords(keyword, e.value.trim())<2){
            suggestedTagList.push(e.value.trim()) 
        }
    }) 

    return suggestedTagList
}


exports.searchQueries = async (req, res) =>{  
    var queries = req.query.queries.split(" ")
    var searchResults = [] 
    var intersectedSearchResults = []
    var emptyKeywords = []
    var wrongKeywords = [] 
    
    for(var i = 0; i<queries.length; i++){ 
        try {
            var tag = queries[i].trim().toLowerCase()
            var products = await getProductListByTagName(tag)  
            var localArray = []
            if(products){
                products.productList.map(e=>{
                    localArray.push(e.productId.toString()) 
                }) 
                searchResults.push(localArray) 
            }else{ 
                // console.log(tag)
                var tagList = await getTagListForWrongKeyword(tag) 
                // console.log(tag,"=>", tagList)
                if(tagList.length){
                    for(var j = 0; j<tagList.length; j++){
                        products = await getProductListByTagName(tagList[j]) 
                        if(products.productList.length){
                            products.productList.map(e=>{
                                localArray.push(e.productId.toString()) 
                            }) 
                            searchResults.push(localArray) 
                        }else{
                            emptyKeywords.push(tagList[j])  
                        }
                        // console.log(tag , tagList)
                    }
                }else{
                    wrongKeywords.push(tag) 
                }
            }      
            
        
        } catch (error) {
            res.send(error) 
        }
        
    } 
    if(searchResults){
        intersectedSearchResults = intersectedProducts(searchResults) 
    }
    
    console.log("Product list not found for keywords: ",emptyKeywords) 
    console.log("wrong keywords ", wrongKeywords) 
    return intersectedSearchResults? res.send(intersectedSearchResults) : res.status(204).send(null) 
     
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


// console.log(typeof(getProductListByTag("black")))

// getProductListByTagName("grey").then(e=>console.log(e))

// console.log(DistanceBetweenWords("black", "back"))


// getTagListByWrongKeyword("toy").then(e=>{
//     console.log(e)
// })