import { Router } from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../controllers/appointments.controller.js";

const router = Router();

router.get("/appointments", getAppointments);

router.get("/appointments/:id", getAppointment);

router.post("/appointments", createAppointment);

router.delete("/appointments/:id", deleteAppointment);

router.put("/appointments/:id", updateAppointment);

export default router;
