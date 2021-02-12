import { Request } from "express";
import { CategoryBaseDocumentType } from "../model/category";
import slugify from "slugify";
import Category from "../model/category";

export interface CustomProductRequest extends Request<{}, {}, CategoryBaseDocumentType> {
  allowedAdmin?: {
    _id: string;
    profileName: string;
    iat: number;
    exp: number;
  };
}

const createCategory = (req: CustomProductRequest, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    parentId: undefined,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);

  cat.save(undefined, (err, doc) => {
    if (err) return res.status(400).json({ success: false, message: "cannot store category data", err });

    return res.status(201).json({ success: true, message: "successfully stored", doc });
  });
};

const getCategory = (req: CustomProductRequest, res) => {
  Category.find({}, (err, docs) => {
    if (err) return res.status(400).json({ err });

    res.status(200).json({ success: true, docs });
  });
};

export { createCategory, getCategory };
