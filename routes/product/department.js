const express = require("express");
const {addDepartment, getAllDepartment, getDepartmentById, updateDepartment, deleteDepartment} = require('../../controllers/product/departmentController')
const router = express.Router(); 

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/', addDepartment) 

//Get
//Get All Departments
router.get('/',  getAllDepartment) //[auth, staff],

//Get Department by Id
router.get('/:id', getDepartmentById)

//Put
router.put('/:id', [auth, staff], updateDepartment);

//Delete
router.delete('/:id', [auth, staff], deleteDepartment);

module.exports = router; 