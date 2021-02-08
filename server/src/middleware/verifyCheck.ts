import { Request, Response, NextFunction } from "express";

const verifyChecker = (req: Request, res: Response, next: NextFunction) => {
  const headerKey = req.headers.authorization;
  console.log(headerKey);

  next();
};

export default verifyChecker;
