import { Router, Request } from "express";
import { requiredAdminAuth, uploadPictures } from "../middleware/Validator";
import { createProduct } from "../controller/products";

const router = Router();

router.post("/createProduct", requiredAdminAuth, uploadPictures(), createProduct);

export default router;
