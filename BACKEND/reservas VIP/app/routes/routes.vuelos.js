import { Router } from "express";
import { ActualizarVuelo, CrearVuelo, EliminarVuelo, ListarVuelos, MostrarVuelo, VueloConfig } from "../controller/controller.Vuelos.js";
import { ValidarPermiso } from "../middlewares/middlewares.js";

const RutaVuelo = Router();

RutaVuelo.get("/vuelo/:id", ValidarPermiso, MostrarVuelo);

RutaVuelo.post("/vuelo",  CrearVuelo);

RutaVuelo.post("/editar" , VueloConfig);

RutaVuelo.get("/vuelos", ListarVuelos);

RutaVuelo.put("/vuelo", ValidarPermiso, ActualizarVuelo);

RutaVuelo.delete("/vuelo", ValidarPermiso, EliminarVuelo);

export default RutaVuelo;

