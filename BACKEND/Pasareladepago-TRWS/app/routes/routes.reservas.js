import { Router } from "express";
import { ActualizarReserva, CrearReserva, EliminarReserva, ListarReservas, MostrarReserva, VerificarReserva } from "../controllers/controller.reservas.js";
import { validarPermiso } from "../middlewares/middleware.reserva.js";

const RutaReservas = Router();

RutaReservas.get("/reserva/:id", validarPermiso, MostrarReserva);

RutaReservas.post("/reserva" , validarPermiso, CrearReserva);

RutaReservas.get("/reserva", ListarReservas);

RutaReservas.post("/verificar", VerificarReserva);

RutaReservas.put("/reserva", validarPermiso, ActualizarReserva);

RutaReservas.delete("/reserva", validarPermiso, EliminarReserva);

export default RutaReservas;


