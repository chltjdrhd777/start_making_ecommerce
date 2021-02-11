import { Request, Response } from "express";
import User, { UserBaseDocumentType } from "../model/UserModel";
import jwt from "jsonwebtoken";

export interface CustomUserRequest extends Request<{}, {}, UserBaseDocumentType> {}

const register = (req: CustomUserRequest, res: Response) => {
  User.findOne({ email: req.body.email }, null, null, (err, targetUser) => {
    //conditions/////
    if (err)
      return res.status(400).json({
        success: false,
        message: "cannot find one because of some errors",
      });

    if (targetUser) return res.status(400).json({ success: false, message: "User already registered" });

    //after/////
    const { firstName, lastName, email, password, profileName } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      profileName,
    });

    user.save().then((userdata) => {
      if (!userdata) return res.status(400).json({ success: false, message: "register failed" });

      return res.status(201).json({ success: true, message: "ok register is done", userdata });
    });
  });
};

const login = (req: CustomUserRequest, res: Response) => {
  User.findOne({ email: req.body.email }, null, null, (err, targetUser) => {
    //conditions/////
    if (err) return res.status(400).json({ success: false, message: "cannot find user" });

    if (!targetUser) return res.status(400).json({ success: false, message: "no user" });

    //after/////
    targetUser.authentification(req.body.password).then((isEqual) => {
      if (!isEqual) return res.status(400).json({ success: false, message: "wrong password" });

      const token = jwt.sign({ _id: targetUser._id, profileName: targetUser.profileName }, process.env.JWT_SECRET, { expiresIn: "1h" });
      targetUser.token = token;
      targetUser.save();
      res.cookie("authorized_user", token).status(200).json({ success: true, message: "login complete and token updated" });
    });
  });
};

export { register, login };
