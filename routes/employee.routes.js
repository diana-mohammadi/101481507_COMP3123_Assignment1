import { Router } from "express";
import { body, param, query } from "express-validator";
import { handleValidation } from "../middleware/validate.js";
import {
  getEmployee, addEmployee, getAllEmployees, updateEmployee, deleteEmployee
} from "../controllers/employee.controller.js";
const router = Router();//create express route instance

router.get("/employees", getAllEmployees);//get all the employees

router.post(//create a new employee
  "/employees",
  [
    //validation
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("email").isEmail(),
    body("position").notEmpty(),
    body("salary").isNumeric(),
    body("date_of_joining").isISO8601().toDate(),
    body("department").notEmpty(),
  ],
  handleValidation,//process validation
  addEmployee
);
router.get(//get a specific employee by id
  "/employees/:eid",
  //validate
  [param("eid").isMongoId()],
  handleValidation,
  getEmployee
);
router.put(//update an employee info
  "/employees/:eid",
  [
    //validate
    param("eid").isMongoId(),
    //validate only when provided
    body("email").optional().isEmail(),
    body("salary").optional().isNumeric(),
    body("date_of_joining").optional().isISO8601().toDate(),
  ],
  handleValidation,
  updateEmployee
);
router.delete(
  "/employees",
  [query("eid").isMongoId()],
  handleValidation,
  deleteEmployee
);
export default router;