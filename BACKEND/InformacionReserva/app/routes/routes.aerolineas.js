import { Router } from "express";
import { actualizarAerolineas, crearAerolineas, eliminarAerolineas, listarAerolineas, loginAerolineas, mostrarAerolineas } from "../controllers/controllers.aerolineas.js";
import { validarPermiso } from "../middlewares/middlewares.aerolinea.js";

const rutaAerolineas = Router();

rutaAerolineas.post("/aerolinea", validarPermiso,crearAerolineas);
rutaAerolineas.get("/aerolinea/:id", mostrarAerolineas);
rutaAerolineas.get("/aerolinea", listarAerolineas);
rutaAerolineas.post("/login", loginAerolineas);
rutaAerolineas.put("/aerolinea", validarPermiso,actualizarAerolineas);
rutaAerolineas.delete("/aerolinea", validarPermiso,eliminarAerolineas);

export default rutaAerolineas;