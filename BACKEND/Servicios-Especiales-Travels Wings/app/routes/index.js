import { Router } from "express";
import RutaServicioEspecial from "./routes.Sespecial.js";
import RutaCasosEspeciales from "./routes.casosEspeciales.js";

const ruta = Router();


ruta.use("/api", RutaServicioEspecial);
ruta.use("/api", RutaCasosEspeciales);

export default ruta;

