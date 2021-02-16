import { Router } from "express";
import { requiredAdminAuth } from "../middleware/Validator";
import { createProduct } from "../controller/products";
import multer from "multer";
import shortid from "shortid";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/createProduct", requiredAdminAuth, upload.single("productPictures"), createProduct);

export default router;
