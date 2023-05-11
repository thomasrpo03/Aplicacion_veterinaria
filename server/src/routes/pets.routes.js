import { Router } from "express";
import {
  getPets,
  createPet,
  updatePet,
  deletePet,
  getPet,
} from "../controllers/pets.controller.js";
// import { pool } from "../db.js";

const router = Router();

router.get("/pets", getPets);

router.get("/pets/:id", getPet);

router.post("/pets", createPet);

router.patch("/pets/:id", updatePet);

router.delete("/pets/:id", deletePet);

export default router;
