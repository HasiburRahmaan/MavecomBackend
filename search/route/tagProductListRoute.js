 const express = require('express')
 const router = express.Router() 

const { 
    updateProductListByTagTable,
    searchQueries,

} = require('../controller/tagProductListController')

router.get('/update-table', updateProductListByTagTable) 

router.get('/s', searchQueries) 

 module.exports = router