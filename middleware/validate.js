import { validationResult } from "express-validator";

export function handleValidation(req, res, next) {//handle validation result
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();//if no error, oroceed to the next middleware
  return res.status(400).json({
    status: false,
    message: "Validation failed",
    errors: errors.array().map(e => ({ field: e.param, msg: e.msg }))
  });
}