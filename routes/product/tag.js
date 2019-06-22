const express = require("express");
const router = express.Router();
const {addTag, getAllTag, getTagById, updateTag, deleteTag} = require("../../controllers/product/tagController"); 

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post 
router.post('/', addTag)

//Get
router.get('/', getAllTag);//[auth, staff],

router.get('/:id', getTagById);

//Put
router.put('/:id', updateTag );//[auth, staff],

//Delete
router.delete('/:id', deleteTag); //[auth, staff],

module.exports = router; 