import { Router } from "express";
import { ListarUsuario, LoginUsuario, actualizarUsuario, crearUsuario, eliminarUsuario, mostrarUsuario } from "../controller/controller.usuarios.js";
import { validarPermiso } from "../middlewares/middleware.usuario.js";

const RutaUsuario = Router();

RutaUsuario.get("/usuario/:id", validarPermiso, mostrarUsuario);

RutaUsuario.post("/usuario",  crearUsuario);

RutaUsuario.get("/usuario", ListarUsuario);

RutaUsuario.post("/login", LoginUsuario);

RutaUsuario.put("/usuario", validarPermiso, actualizarUsuario);

RutaUsuario.delete("/usuario", validarPermiso, eliminarUsuario);



export default RutaUsuario;