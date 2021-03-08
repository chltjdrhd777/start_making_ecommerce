import { Request, Response } from "express";
import { UserBaseDocumentType } from "../model/UserModel";
import Page, { PageBaseDocumentType } from "../model/page";

export interface CustomPageRequest extends Request<{}, {}, PageBaseDocumentType> {
  adminData: UserBaseDocumentType;
}

const createPage = (req: CustomPageRequest, res: Response) => {
  //# structure =
  //# 1. from req.files = {banners,products}[], <--- each have img,href property
  //# 2. render this as map return type{img,href}
  //# 3. and replace the previous one with the rendered one

  const { banners, products } = req.files as { banners: Express.Multer.File[]; products: Express.Multer.File[] };
  if (banners && banners.length > 0) {
    req.body.banners = banners.map((banner) => {
      return {
        img: `${process.env.HOSTAPI}/public/${banner.filename}`,
        href: `/bannerClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`,
      };
    });
  }

  if (products && products.length > 0) {
    req.body.products = products.map((product) => {
      return {
        img: `${process.env.HOSTAPI}/public/${product.filename}`,
        href: `/productClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`,
      };
    });
  }

  req.body.createdBy = req.adminData._id;

  const page = new Page(req.body);

  page.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(201).json({ doc });
  });
};

export { createPage };
