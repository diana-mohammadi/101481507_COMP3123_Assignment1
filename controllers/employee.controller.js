import Employee from "../models/Employee.js";
import mongoose from "mongoose";

async function addEmployee(req,res){//add a neew employee to the db
    try{
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;//extract the data from body
        if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
             return res.status(400).json({ status: false, message: "All fields are required" });//validate
        }
        const exists = await Employee.findOne({ email });
        if (exists) {
            return res.status(400).json({ status: false, message: "Employee already exists" });
        }
        const emp = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        });
        return res.status(201).json({
            message: "Employee created successfully.",
            employee_id: emp._id.toString(),
        });
        
    }
    catch{
        res.status(500).json({ status: false, message: "Server error" });
    }
}

async function getEmployee(req,res){
    try{
        //find employee by id provided using lean() to returns plain js object
        const emp = await Employee.findById(req.params.eid).lean();
        if (!emp){
            return res.status(404).json({ status: false, message: "Employee doesn't exist" });
        } else{
           res.status(200).json(emp); 
        }
    }catch (err) {//for db errors
    res.status(500).json({ status: false, message: "Server error" });
  }
}
async function updateEmployee(req, res) {
    try{
        const { eid } = req.params;//get employee id from url parameters
        if (!mongoose.isValidObjectId(eid)) {//validate
            return res.status(400).json({ status: false, message: "Invalid employee id" });
        }
        const {//update the fields
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        } = req.body;
        const update = {};//update object with the updated fields
        if (first_name !== undefined) {
            update.first_name = first_name;
        }
        if (last_name !== undefined) {
            update.last_name  = last_name;
        }
        if (email !== undefined) {
            update.email = email;
        }
        if (position !== undefined) {
            update.position = position;
        }
        if (salary !== undefined) {
             update.salary= salary;}
        if (date_of_joining !== undefined) {
            update.date_of_joining = date_of_joining;
        }
        if (department !== undefined) {
            update.department = department;
        }
        const emp = await Employee.findByIdAndUpdate(
            eid,
            { $set: update },
            { new: true, runValidators: true }//run schema validations on theh updated employee
        );
        if (!emp) {
            return res.status(404).json({ status: false, message: "Employee not found" });
        }else{
            return res.status(200).json({ message: "Employee details updated successfully." });
        }


    }catch (err) {
    
    return res.status(500).json({ status: false, message: "Server error" });
  }
}
async function deleteEmployee(req, res) {
  const { eid } = req.query;//get employee id from query parameters
  const emp = await Employee.findByIdAndDelete(eid);
  if (!emp) {
    return res.status(404).json({ status: false, message: "Employee not found" });
  }
  return res.status(204).send(); 
}




async function getAllEmployees(req, res) {
  const employees = await Employee.find().lean();
  const employeeList = employees.map(e => ({
    employee_id: e._id.toString(),
    first_name: e.first_name,
    last_name: e.last_name,
    email: e.email,
    position: e.position,
    salary: e.salary,
    date_of_joining: e.date_of_joining,
    department: e.department,
  }));
  return res.status(200).json(employeeList);
}
export {getAllEmployees,getEmployee,updateEmployee,addEmployee,deleteEmployee}