import { Request, Response } from "express";
import Category from "../model/category";
import Product from "../model/product";

export interface CustomProductRequest extends Request<{}, {}> {}

const initialData = async (req: Request, res: Response) => {
  const categoryData = await Category.find({}, (err, doc) => {});

  const productData = await Category.find({}, (err, doc) => {});
};

export { initialData };
