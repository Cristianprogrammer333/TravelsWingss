import { Router } from "express";
import { MostrarMoneda } from "../controllers/controller.moneda";

const RutaMoneda = Router();

RutaMoneda.get("/moneda", MostrarMoneda);

export default RutaMoneda;

