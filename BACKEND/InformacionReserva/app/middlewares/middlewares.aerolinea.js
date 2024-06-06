import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const tokenSign = (data) =>{ //Para crear token
    return jwt.sign({
        Nombre : data.Nombre,
        Codigo : data.Codigo,
        firma : "Travels Wings"
    },process.env.JWT_SECRET,
    {
        expiresIn : process.env.JWT_TIMEEXPIRE
    })
}
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}
export const validarPermiso = (req, res, next)=>{

    let token = req.headers["x-access-token"];

    try {
        if (verifyToken(token)==null){
            res.json({
                "error":"No tiene permiso para acceder",
                "token": "token invalido"
            })
        } else {
            next();
        }
    } catch (error) {
        res.json({
            "error":error,
            "token": "token invalido"
        });
    }
}