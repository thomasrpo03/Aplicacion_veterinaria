import { Router } from "express";
import { getAppointments, getAppointment, createAppointment } from "../controllers/appointments.controller.js";

const router = Router();

router.get("/appointments", getAppointments);

router.get("/appointments/:id", getAppointment);

router.post("/appointments", createAppointment);





export default router;