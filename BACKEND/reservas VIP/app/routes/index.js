import { Router } from "express";
import RutaVuelo from "./routes.vuelos.js";
import RutaRegistroVuelos from "./routes.RegistroVuelos.js";

const Ruta = Router();

Ruta.use("/api", RutaVuelo);
Ruta.use("/api", RutaRegistroVuelos);

export default Ruta;

