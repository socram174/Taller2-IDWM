import express from "express";
import { adminLogin, userRegister } from "../controllers/auth.js"

const router = express.Router();

/* ADMIN */
router.post("/login", adminLogin);

router.post("/register", userRegister);

export default router;