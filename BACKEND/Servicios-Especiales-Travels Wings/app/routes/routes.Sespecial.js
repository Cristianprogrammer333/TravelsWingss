import { Router } from "express";
import { ActualizarServiciosEspeciales, CrearServicioEspecial, EliminarServiciosEspeciales, MostrarServicioEspecial, VerificarServicio, VerificarServiciosEspeciales } from "../controllers/controller.ServicioEspeciales.js";
import { validarPermiso } from "../middlewares/middleware.ServiciosEspeciales.js";

const RutaServicioEspecial = Router();

RutaServicioEspecial.get("/servicio/:id", validarPermiso, MostrarServicioEspecial);

RutaServicioEspecial.post("/servicio" , validarPermiso, CrearServicioEspecial);

RutaServicioEspecial.get("Servicios", VerificarServiciosEspeciales);

RutaServicioEspecial.post("/verificar", VerificarServicio);

RutaServicioEspecial.put("/servicio", validarPermiso, ActualizarServiciosEspeciales);

RutaServicioEspecial.delete("/servicio", validarPermiso, EliminarServiciosEspeciales);

export default RutaServicioEspecial;
