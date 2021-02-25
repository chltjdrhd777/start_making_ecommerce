import { Router } from "express";
import { createCategory, getCategory } from "../controller/category";
import { requiredAdminAuth, uploadPictures } from "../middleware/Validator";

const router = Router();

router.post("/createCategory", requiredAdminAuth, uploadPictures("single"), createCategory);
router.post("/getCategory", requiredAdminAuth, getCategory);

export default router;
