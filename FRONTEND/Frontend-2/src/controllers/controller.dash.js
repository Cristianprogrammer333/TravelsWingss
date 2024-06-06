import { config } from "dotenv";
import { validarToken } from "./controller.usuario";
config();


export const MostrarDash = (req, res) =>{
    let token = "";
    const cookieToken = req.headers.cookie;
    const url = process.env.URL_BACK;

    if(cookieToken){
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie =>{
            const [nombre, valor] = cookie.split('=');
            if(nombre.trim () === 'token'){
                token = valor;
            }
        });
}
    let datos = validarToken(token);
    if (datos !== ""){
        res.render("views.dash.ejs" , {"datos":datos});
        return;
    }
    res.redirect("/login.html");
};