import { Router } from "express";
import rutaAerolineas from "./routes.aerolineas.js";


const rutaAerolinea = Router();

rutaAerolinea.use("/api", rutaAerolineas);

export default rutaAerolinea;
