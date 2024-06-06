import { Router } from "express";
import { ServiciosEspeciales } from "../controllers/controller.Sespecial";

const RutaServicioEspecial = Router();

RutaServicioEspecial.get("/servicio", ServiciosEspeciales);

export default RutaServicioEspecial;
