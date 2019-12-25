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
router.post('/post', [auth, staff], addAttrs)

//Get All Attributes
router.get('/', [auth, staff], getAllAttrs)

//Get Attribute by Id
router.get('/:id', [auth, staff], getAttrById)

//Put
router.put('/update/:id', [auth, staff], updateAttrs);

//Delete
router.delete('/delete/:id', [auth, staff], deleteAttrs)

module.exports = router;

