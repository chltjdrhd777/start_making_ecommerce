import { CategoryBaseDocumentType } from "./../model/product.category";
import { Router, Request, Response } from "express";
import slugify from "slugify";
import Category from "../model/product.category";

const router = Router();

interface CustomCategoryRequest extends Request<{}, {}, CategoryBaseDocumentType> {}

router.post("/category/create", (req: CustomCategoryRequest, res: Response) => {
  const categoryData = {
    name: req.body.name,
    slug: slugify(req.body.name),
    parentID: "",
  };

  if (req.body.parentID) {
    categoryData.parentID = req.body.parentID;
  }

  const category = new Category(categoryData);
  category.save(null, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    if (doc) {
      return res.status(201).json({ doc });
    }
  });
});

export default router;
