import {login, register} from "../services/auth";

import { Router } from "express";
const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
