import { Router } from "express";
import RutaUsuario from "./routes.usuarios.js";
import RutaVueloUsuario from "./routes.vuelousuario.js";

const Ruta = Router();

Ruta.use("/api", RutaUsuario);
Ruta.use("/api", RutaVueloUsuario);

export default Ruta;


