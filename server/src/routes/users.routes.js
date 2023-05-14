import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";

const router = Router();

router.post("/users/", getUsers);

export default router;
