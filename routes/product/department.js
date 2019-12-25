const express = require("express");
const { addDepartment, getAllDepartment, getDepartmentById, updateDepartment, deleteDepartment } = require('../../controllers/product/departmentController')
const router = express.Router();

const { staff } = require("../../middleware/authorization");
const { admin } = require("../../middleware/authorization");
const auth = require("../../middleware/auth");


//Post
router.post('/post', addDepartment)

//Get
//Get All Departments
router.get('/', [auth, staff], getAllDepartment)

//Get Department by Id
router.get('/:id', [auth, staff], getDepartmentById)

//Put
router.put('/update/:id', [auth, staff], updateDepartment);

//Delete
router.delete('/delete/:id', [auth, staff], deleteDepartment);

module.exports = router; 