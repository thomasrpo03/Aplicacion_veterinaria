import { Router } from "express";
import { getClients,  getClient, createClient, updateClient, deleteClient, getTipoDocumento } from "../controllers/clients.controller.js";

const router = Router();

router.get("/clients", getClients);

router.get("/clients/:id", getClient);

router.post("/clients", createClient);

router.put("/clients/:id", updateClient);

router.delete("/clients/:id", deleteClient);

router.get("/tipodocumento", getTipoDocumento);

export default router;