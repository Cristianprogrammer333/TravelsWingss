import { Router } from "express";
import { MostrarCalendario } from "../controllers/controller.calendario";

const RutaCalendario = Router();

RutaCalendario.get("/calendario", MostrarCalendario);

export default RutaCalendario;
