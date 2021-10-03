import auth from "./auth";
import users from "./users";
import { Router } from "express";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);

export default router;
