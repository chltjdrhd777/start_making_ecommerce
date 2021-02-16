import { Router } from "express";
import { register, login } from "../controller/auth";

const router = Router();

//routes
router.post("/register", register);

router.post("/login", login);

export default router;
