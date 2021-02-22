import { Router } from "express";
import { requiredUserAuth } from "../middleware/Validator";
import { register, login, logout, userTokenEx } from "../controller/auth";

const router = Router();

//routes
router.post("/register", register);

router.post("/login", login);

router.post("/logout", requiredUserAuth, logout);

router.post("/userTokenEx", userTokenEx);

export default router;
