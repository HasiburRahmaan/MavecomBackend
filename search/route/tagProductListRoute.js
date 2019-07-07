 const express = require('express')
 const router = express.Router() 

const { 
    updateProductListByTagTable,
} = require('../indexing/controller/IndexingByTagController')

// const {
//     updateProductListByProductName
// } = require('../indexing/controller/IndexingByProductNameController')

const {searchQueries} = require('../controller/tagProductListController')

require('../../recommendation-system/routes/recomendationRoutes')


router.get('/indexing-by-tag', updateProductListByTagTable) 
// router.get('/indexing-by-name', updateProductListByProductName)

router.get('/s', searchQueries) 
//Demo url : {{url}}/api/search/s?queries=iron+man+action+figure

 module.exports = router