import { ProductBaseDocumentType } from "../model/product";
import { Request, Response } from "express";
import shortid from "shortid";

export interface CustomProductRequest extends Request<{}, {}, ProductBaseDocumentType> {}

const createProduct = (req: CustomProductRequest, res: Response) => {
  res.status(200).json({ file: req.file, body: req.body });
};

export { createProduct };
