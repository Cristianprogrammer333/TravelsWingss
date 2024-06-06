import { config } from "dotenv";
config();

//Esta constante sirve para mostrarnos la pagina donde el usuario escogera el cambio de moneda
export const MostrarMoneda = (req, res) =>{
    res.render("views.usuario.cambiomoneda.ejs");
};