import { config } from "dotenv";
config();

export const MostrarCalendario = (req, res) =>{
    res.render("views.usuario.calendario.ejs");
}
