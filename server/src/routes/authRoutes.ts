import { Router } from "express";
import { register, login } from "../controller/auth";
import veryifyChecker from "../middleware/verifyCheck";

const router = Router();

//typeDef
router.post("/register", register);

router.post("/login", login);

router.post("/profile", veryifyChecker, (req, res) => {
  res.json({ message: "work" });
});

export default router;
