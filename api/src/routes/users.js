import express from "express";
import { getUsers, deleteUser, editUser } from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ADMIN */
router.get("/", verifyToken, getUsers);
router.delete("/:id",verifyToken, deleteUser );
router.post("/edit/:rutOrDni",verifyToken, editUser );

export default router;