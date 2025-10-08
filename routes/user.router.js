import { Router } from "express";
import { body } from "express-validator";
import { handleValidation } from "../middleware/validate.js";
import { signup, login } from "../controllers/user.controller.js";

const router=Router()

router.post("/signup",[//register a new user
  //validation middleware
    body("username").trim().notEmpty().withMessage("username required"),
    body("email").isEmail().withMessage("valid email required"),
    body("password").isLength({ min: 6 }).withMessage("password min 6 chars"),
  ],
  handleValidation,
  signup)

  router.post("/login", [//authenticate the user 
    body("password").notEmpty().withMessage("password required"),
    body("username")
      .custom((value, { req }) => {
        if (!value && !req.body.email) {//when neither emial nor username exist
          throw new Error("You should provide either username or email");
        }
        return true;
      }),

    body("email").optional().isEmail().withMessage("incorrect email"),
  ],
  handleValidation,
  login)
export default router;