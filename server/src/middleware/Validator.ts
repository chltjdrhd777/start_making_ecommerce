import { check, validationResult } from "express-validator";

const formValidators = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is reqruied"),
  check("email").isEmail().withMessage("valid email is required"),
  check("password").isLength({ min: 6 }).withMessage("password must be at least 6 charater long"),
];

const formLoginValidators = [
  check("email").isEmail().withMessage("valid email is required"),
  check("password").isLength({ min: 6 }).withMessage("password must be at least 6 charater long"),
];

const validatedResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ err: errors.array()[0].msg });
  } else {
    next();
  }
};

export { formValidators, formLoginValidators, validatedResult };
