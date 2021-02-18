import { UserBaseDocumentType } from "./../model/UserModel";
import slugify from "slugify";
import { ProductBaseDocumentType } from "../model/product";
import { Request, Response } from "express";
import Product from "../model/product";

export interface CustomProductRequest extends Request<{}, {}, ProductBaseDocumentType> {
  adminData: UserBaseDocumentType;
  files: Express.Multer.File[];
}

const createProduct = (req: CustomProductRequest, res: Response) => {
  //res.status(200).json({ files: req.files, admin: req.adminData });
  const { name, price, description, offer, review, category, updatedAt, quantity } = req.body;

  let productPictures = [] as { img: string }[];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    createdBy: req.adminData._id,
    quantity,
    review,
  });

  product.save(undefined, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err });

    res.status(200).json({ success: true, doc });
  });
};

export { createProduct };
