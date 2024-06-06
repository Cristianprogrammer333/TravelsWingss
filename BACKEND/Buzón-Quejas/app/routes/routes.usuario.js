import { Router } from "express";
import { actulizarUsuario, 
    crearUsuario, 
    eliminarUsuario, 
    mostrarUsuario} from "../controllers/controllers.usuario.js";
// import { validarPermiso } from "../middlewares/middleware.usuario.js";

const rutaUsuario = Router();

rutaUsuario.post("/usuario", crearUsuario);
rutaUsuario.get("/usuario", mostrarUsuario);
rutaUsuario.put("/usuario", actulizarUsuario);
rutaUsuario.delete("/usuario", eliminarUsuario);

export default rutaUsuario;


