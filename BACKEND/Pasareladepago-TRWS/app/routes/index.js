import { Router } from "express";
import RutaReservas from "./routes.reservas.js";
import RutaConfigReserva from "./routes.configreservas.js";

const Ruta = Router();

Ruta.use("/api", RutaReservas);
Ruta.use("/api", RutaConfigReserva);

export default Ruta;






