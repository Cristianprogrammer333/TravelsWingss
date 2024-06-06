import { config } from "dotenv";
config();

//Esta constante nos sirve para mostrarnos la pagina donde ek usuario podra solicitar su servicio
export const ServiciosEspeciales = (req, res) =>{
    res.render("views.usuario.Sespecial.ejs");
};