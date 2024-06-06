import { config } from "dotenv";
config();

export const MostrarPaypal = (req, res) =>{
    res.render("views.usuario.paypal.ejs");
}