 const express = require('express')
 const router = express.Router() 

const { 
    updateProductListByTagTable,
} = require('../indexing/controller/IndexingByTagController')

const {searchQueries} = require('../controller/tagProductListController')

router.get('/update-table', updateProductListByTagTable) 

router.get('/s', searchQueries) 

 module.exports = router