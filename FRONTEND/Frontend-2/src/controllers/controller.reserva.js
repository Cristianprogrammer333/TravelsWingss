import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const CrearReserva = (req, res) =>{
    const url = "http://localhost:9999/api/reserva";

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(data=>{
        res.render("views.usuario.reserva.ejs",
            {
                "titulo": "Travels Wings",
                "datos": data
            }
        );
    })
    .catch(error=>console.error(error))
};

//validando
export const validarToken = (token) =>{
    let respuesta = "";
    const secret = process.env.JWT_SECRET;
    if(!token){
        return "";
    }
    
    jwt.verify(token, secret, (error, decodedToken) => {
        if(error) {
            //Error al verificar el token
            console.log('Error al verificar el token: ', error);
            return ""
        }else{
            //token verificado correctamente, puedes acceder
            //console.log('Token decodificado:', decodedToken)
            respuesta=decodedToken;
        }
    })
    return respuesta;
}

export const MostrarReserva = (req, res) =>{
    
    res.render("views.usuario.reserva.ejs")
};