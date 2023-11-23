import express from "express";
import { getUsers, deleteUser, editUser } from "../controllers/users.js"

const router = express.Router();

/* ADMIN */
router.get("/", getUsers);
router.delete("/:id", deleteUser );
router.post("/edit/:rutOrDni", editUser );

export default router;