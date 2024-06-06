import { Router } from "express";
import { CrearReserva, MostrarReserva } from "../controllers/controller.reserva";


const RutaReserva = Router();


RutaReserva.get("/reserva" , MostrarReserva);
RutaReserva.post("/reserva", CrearReserva);


export default RutaReserva;
