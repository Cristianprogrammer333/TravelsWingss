import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

//Esta constante sirve para mostrarme la pagina de los vuelos
export const ReservarVuelo = (req, res) =>{
    res.render("views.usuario.vuelo.ejs");
}

