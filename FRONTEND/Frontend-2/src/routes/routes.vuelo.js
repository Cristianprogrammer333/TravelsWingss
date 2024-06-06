import { Router } from "express";
import { ReservarVuelo } from "../controllers/controller.vuelo";

const RutaVuelo = Router();


RutaVuelo.get("/vuelo", ReservarVuelo );

export default RutaVuelo;
