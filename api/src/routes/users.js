import express from "express";
import { getUsers, deleteUser } from "../controllers/users.js"

const router = express.Router();

/* ADMIN */
router.get("/", getUsers);
router.delete("/:id", deleteUser );

export default router;