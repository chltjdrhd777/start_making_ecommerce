/* import { ProductBaseDocumentType } from "../model/product.category";
import slugify from "slugify";
import Products from "../model/product.category";
import { Request, Response } from "express";

export interface CustomProductRequest extends Request<{}, {}, ProductBaseDocumentType> {
  allowedAdmin?: {
    _id: string;
    profileName: string;
    iat: number;
    exp: number;
  };
}

const createProduct = (req: CustomProductRequest, res: Response) => {
  const categoryData = {
    name: req.body.name,
    slug: slugify(req.body.name), //for making unique product information
  };

  const products = new Products(categoryData);
  products.save(null, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    if (doc) {
      return res.status(201).json({ doc });
    }
  });
};

const getProducts = (req, res: Response) => {
  Products.find({}, (err, docs) => {
    if (err) return res.status(400).json({ err });

    res.status(200).json({ docs });
  });
};

export { createProduct, getProducts };
 */
