import { Router } from "express";
import { createCategory, getCategory } from "../controller/category";
import { requiredAdminAuth } from "../middleware/Validator";

const router = Router();

router.post("/createCategory", requiredAdminAuth, createCategory);
router.get("/getCategory", getCategory);

export default router;
