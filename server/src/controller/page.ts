import { Request, Response } from "express";

export interface CustomPageRequest
  extends Request<
    {},
    {},
    { categoryId: string; type: string; banners: { img: string; href: string }[]; products: { img: string; href: string }[] }
  > {}

const createPage = (req: CustomPageRequest, res: Response) => {
  //# structure =
  //# 1. from req.files = {banners,products}[], <--- each have img,href property
  //# 2. render this as map return type{img,href}
  //# 3. and replace the previous one with the rendered one

  const { banners, products } = req.files as { banners: Express.Multer.File[]; products: Express.Multer.File[] };
  if (banners.length > 0) {
    req.body.banners = banners.map((banner, index) => {
      return {
        img: `${process.env.HOSTAPI}/public/${banner.filename}`,
        href: `/bannerClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`,
      };
    });
  }

  if (products.length > 0) {
    req.body.products = products.map((product, index) => {
      return {
        img: `${process.env.HOSTAPI}/public/${product.filename}`,
        href: `/productClicked?categoryId=${req.body.categoryId}&type=${req.body.type}`,
      };
    });
  }

  res.status(200).json({ body: req.body });
};

export { createPage };
