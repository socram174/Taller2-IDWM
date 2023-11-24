import express from "express";
import { adminLogin, userRegister } from "../controllers/auth.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Ruta para el inicio de sesión del administrador*/
router.post("/login", adminLogin);

/* Ruta para el registro de usuarios, protegida por el bearer token*/
router.post("/register",verifyToken, userRegister);

export default router;