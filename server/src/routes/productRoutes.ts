import { Router, Request } from "express";
import { requiredAdminAuth, uploadPictures } from "../middleware/Validator";
import { createProduct, getProduct } from "../controller/products";

const router = Router();

router.post("/createProduct", requiredAdminAuth, uploadPictures("array"), createProduct);

router.post("/getProduct", requiredAdminAuth, getProduct);

export default router;
