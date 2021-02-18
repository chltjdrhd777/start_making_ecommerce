import { Router } from "express";
import { createCategory, getCategory } from "../controller/category";
import { requiredAdminAuth, uploadPictures } from "../middleware/Validator";

const router = Router();

router.post("/createCategory", requiredAdminAuth, uploadPictures("single"), createCategory);
router.get("/getCategory", getCategory);

export default router;
