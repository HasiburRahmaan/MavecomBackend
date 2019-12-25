const {Department, validateDepartment} = require('../../models/product/department'); 


//Function
async function findById(id){
    try{
        var department =  await Department.findById(id);
        return department
    }catch(error){
        return error
    }
}

//Create Department
exports.addDepartment = async(req, res) =>{  
    const {error} =  validateDepartment(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    try {
        var department = new Department(req.body);
         await department.save();
          res.status(200).send(department); 
    } catch (error) {
        res.send(error) 
    }   
} 

//Get all Department 
exports.getAllDepartment = async(req, res)=>{
    try {
        var departments = await Department.find();
        return res.send(departments);
    } catch (error) {
        res.status(404).send(error)
    }
} 

//GetDepartmentById
exports.getDepartmentById = async(req, res)=>{
    var id = req.params.id;
    try {
        var department =await findById(id)
        return department? res.send(department) : res.status(204).send("Department not found") 
    } catch (error) {
        return res.status(404).send(error);
    }  
}

//Update Department
exports.updateDepartment = async(req, res)=>{
    const {error} =  validateDepartment(req.body);
    if(error){
        res.status(400).send(error.details.map(e=>e.message));      
    }
    var id = req.params.id;
    try {
        var department =await findById(id)
        if(department){
            department.set(req.body);
            await department.save();
            return res.status(202).send(department); 
        }else{
            return res.status(204).send("Department not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
} 

//Delete Department
exports.deleteDepartment = async (req, res)=>{
    var id = req.params.id;
    try {
        var department =await findById(id)
        if(department){
            department.delete();
            return res.status(200).send(department); 
        }else{
            return res.status(404).send("Department not found with this id") 
        } 
    } catch (error) {
        return res.status(404).send(error);
    } 
}
