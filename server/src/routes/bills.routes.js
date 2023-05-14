import { Router } from "express";
import { getBills, getBill } from "../controllers/bills.controller.js";

const router = Router();

router.get("/bills", getBills);

router.get("/bills/:id", getBill);

export default router;
