import   jwt  from "jsonwebtoken";
import { config } from "dotenv";
config();

export const TokenSing = (data) =>{
    return jwt.sign({
        clase: data.clase,
        pais: data.pais,
        firma: "TravelWings"
    }, process.env.JWT_SECRET,
    {
        expiresIn : process.env.JWT_TIMEEXPIRE
    })
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export const ValidarPermiso = (req, res, next) =>{
    let token = req.headers["x-access-token"];

    try {
        if (verifyToken(token)==null){
            res.json({
                "error": "No tienes permiso para acceder",
                "token": "token invalido"
            });
        }else{
            next();
        }
    } catch (error) {
        res.json({
            "erorr": error,
            "token": "token invalido"
        })
    }
}