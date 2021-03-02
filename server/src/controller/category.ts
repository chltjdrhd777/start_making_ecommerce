import { Request, Response } from "express";
import { CategoryBaseDocumentType } from "../model/category";
import slugify from "slugify";
import Category from "../model/category";
import { UserBaseDocumentType } from "../model/UserModel";

export interface CustomCategorytRequest extends Request<{}, {}, CategoryBaseDocumentType> {
  adminData: UserBaseDocumentType;
  files: Express.Multer.File[];
}

const createCategory = (req: CustomCategorytRequest, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    parentId: undefined,
    categoryImage: undefined,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  if (req.file) {
    categoryObj.categoryImage = `${process.env.HOSTAPI}/public/${req.file.filename}`;
  }

  const cat = new Category(categoryObj);

  cat.save(undefined, (err, doc) => {
    if (err) return res.status(400).json({ success: false, message: "cannot store category data", err });

    return res.status(201).json({ success: true, message: "successfully stored", doc });
  });
};

const getCategory = (req, res) => {
  Category.find({}, (err, docs) => {
    if (err) return res.status(400).json({ err });

    const makingCategoryTree = (docs, parentId = undefined) => {
      let categoryList = [];
      let data;

      if (parentId === undefined) {
        data = docs.filter((doc) => doc.parentId === undefined);
      } else {
        data = docs.filter((doc) => doc.parentId === parentId);
      }

      for (let each of data) {
        categoryList.push({
          _id: each._id,
          name: each.name,
          slug: each.slug,
          parentId: each.parentId,
          children: makingCategoryTree(docs, each._id.toString()),
        });
      }

      return categoryList;
    };
    const categoryList = makingCategoryTree(docs);

    res.status(200).json({ success: true, categoryList });
  });
};

const updateCategory = (req: Request, res: Response) => {};

export { createCategory, getCategory, updateCategory };
