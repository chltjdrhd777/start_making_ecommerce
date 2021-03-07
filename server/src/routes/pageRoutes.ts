import { Router } from "express";
import { createPage } from "../controller/page";
import { upload } from "../middleware/Validator";
const router = Router();

router.post("/createPage", upload.fields([{ name: "banners" }, { name: "products" }]), createPage);

export default router;
