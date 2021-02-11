import { Router } from "express";
import { adminCheker, requireAdminAuth } from "../middleware/Validator";
import { createProduct, getProducts } from "../controller/products";

const router = Router();

router.post("/createCategory", requireAdminAuth, adminCheker, createProduct);
router.get("/getProducts", getProducts);

export default router;
