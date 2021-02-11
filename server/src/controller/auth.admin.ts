import { Request, Response } from "express";
import Admin, { UserBaseDocumentType } from "../model/UserModel";
import jwt from "jsonwebtoken";

export interface CustomUserRequest extends Request<{}, {}, UserBaseDocumentType> {}

const register = (req: CustomUserRequest, res: Response) => {
  Admin.findOne({ email: req.body.email }, null, null, (err, targetAdmin) => {
    //conditions/////
    if (err)
      return res.status(400).json({
        success: false,
        message: "cannot find one because of some errors",
      });

    if (targetAdmin) return res.status(400).json({ success: false, message: "Adminn already registered" });

    //after/////
    const { firstName, lastName, email, password, profileName } = req.body;
    const admin = new Admin({
      firstName,
      lastName,
      email,
      password,
      profileName,
      role: "admin",
    });

    admin.save().then((adminUpdated) => {
      if (!adminUpdated) return res.status(400).json({ success: false, message: "register failed" });

      return res.status(201).json({ success: true, message: "ok register is done", adminUpdated });
    });
  });
};

const login = (req: CustomUserRequest, res: Response) => {
  Admin.findOne({ email: req.body.email }, null, null, (err, targetUser) => {
    //conditions/////
    if (err) return res.status(400).json({ success: false, message: "cannot find admin" });

    if (!targetUser) return res.status(400).json({ success: false, message: "no admin" });

    //after/////
    targetUser.authentification(req.body.password).then((isEqual) => {
      if (!isEqual) return res.status(400).json({ success: false, message: "wrong password" });

      const token = jwt.sign({ _id: targetUser._id, profileName: targetUser.profileName }, process.env.JWT_SECRET, { expiresIn: "1h" });
      targetUser.token = token;
      targetUser.save();
      res.cookie("authorized_admin", token).status(200).json({ success: true, message: "login complete and token updated" });
    });
  });
};

export { register, login };
