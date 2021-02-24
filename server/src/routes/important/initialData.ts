import { Router, Request, Response } from "express";
import { initialData } from "../../controller/initialData";

import { formValidators, formLoginValidators, validatedResult, requiredAdminAuth } from "../../middleware/Validator";

const router = Router();

//routes
router.post("/initials", initialData);

export default router;
