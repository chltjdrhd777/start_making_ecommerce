import { Router } from "express";
import { register, login } from "../controller/auth.admin";
import { formValidators, formLoginValidators, validatedResult } from "../middleware/Validator";

const router = Router();

//typeDef
router.post("/register", formValidators, validatedResult, register);

router.post("/login", formLoginValidators, validatedResult, login);

export default router;
