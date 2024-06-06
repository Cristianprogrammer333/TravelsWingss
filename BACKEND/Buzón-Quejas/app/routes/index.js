import { Router } from "express";
import rutaUsuario from "./routes.usuario.js";
import rutaAprendiz from "./routes.aprendiz.js";

const ruta = Router();

ruta.use("/api", rutaUsuario);
ruta.use("/api", rutaAprendiz);

export default ruta;