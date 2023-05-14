import { Router } from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getQueryType,
  getPetName,
  getTreatment,
  getDiagnosisCode,
} from "../controllers/appointments.controller.js";

const router = Router();

router.get("/appointments", getAppointments);

router.get("/appointments/:id", getAppointment);

router.post("/appointments", createAppointment);

router.delete("/appointments/:id", deleteAppointment);

router.put("/appointments/:id", updateAppointment);

router.get("/querytype", getQueryType);

router.get("/petname", getPetName);

router.get("/treatment", getTreatment);

router.get("/diagnosis", getDiagnosisCode);

export default router;
