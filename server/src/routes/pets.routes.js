import { Router } from "express";
import {
  getPets,
  createPet,
  updatePet,
  deletePet,
  getPet,
  getRaceOptions,
} from "../controllers/pets.controller.js";

const router = Router();

router.get("/pets", getPets);

router.get("/pets/:id", getPet);

router.post("/pets", createPet);

router.put("/pets/:id", updatePet);

router.delete("/pets/:id", deletePet);

router.get("/raceoptions", getRaceOptions);

export default router;
