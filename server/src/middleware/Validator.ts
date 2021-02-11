import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { CustomProductRequest } from "../controller/products";
import User from "../model/UserModel";

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

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.authorized_admin;
  const verifiedAdmin = jwt.verify(token, process.env.JWT_SECRET);
  if (!token || !verifiedAdmin) {
    res.status(400).json({ success: false, message: "you are not an admin" });
  } else {
    req.allowedAdmin = verifiedAdmin;
    next();
  }
};

const adminCheker = (req: CustomProductRequest, res, next) => {
  User.findOne({ _id: req.allowedAdmin._id }, null, null, (err, doc) => {
    if (doc.role !== "admin") res.status(400).json({ success: false, message: "you are not an admin" });

    next();
  });
};

export { formValidators, formLoginValidators, validatedResult, requireAdminAuth, adminCheker };
