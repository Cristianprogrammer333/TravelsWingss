import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const tokenSing = (data) =>{ //para crear token
    return jwt.sign({
        correo: data.correo,
        contrasena: data.contrasena,
        firma: "Madrid"
    }, process.env.JWT_SECRET,
    {
        expiresIn : process.env.JWT_TIMEEXPIRED

    });
};

// export const tokenSing = (payload) => {
//     return jwt.sign(payload, 'tu_clave_secreta', { expiresIn: '1h' });
// };


export const verifyToken = (token) =>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null;
    };
};

export const validarPermiso = ( req, res, next ) => {

    let token = req.headers["x-access-token"];

    try {
        if(verifyToken(token)==null) {
            res.json({
                "error": "No tienes permiso para acceder",
                "token": "token errado"
            });
        }else{
            next();
        }
    } catch (error) {
        res.json({
            "error": error,
            "token": "token invalido"
        });
    }
}