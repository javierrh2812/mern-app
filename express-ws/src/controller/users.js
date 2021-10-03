import { Router } from "express";
import { listUsers, getUser, updateUser } from "../services/users";
import { validate } from "../middlewares/jwtValidation";

const router = Router();

router.get("/", validate, listUsers);
router.get("/:id", validate, getUser);
router.put("/:id", validate, updateUser);

export default router;
