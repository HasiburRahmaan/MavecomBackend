const express = require("express");
const router = express.Router();
const {
    addAttrs,  
    getAllAttrs, 
    getAttrById, 
    updateAttrs, 
    deleteAttrs
} = require("../../controllers/product/attrsController")

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/',  addAttrs) //[auth, staff],

//Get All Attributes
router.get('/', getAllAttrs) //[auth, staff]

//Get Attribute by Id
router.get('/:id', getAttrById) //[auth, staff],

//Put
router.put('/:id',[auth, staff], updateAttrs);

//Delete
router.delete('/:id',[auth, staff], deleteAttrs)

module.exports = router; 

