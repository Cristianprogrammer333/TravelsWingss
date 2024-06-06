import { Router } from "express";

const RutaVueloUsuario = Router();

RutaVueloUsuario.get("/Vuelo", (req, res) => {
    res.json({
        "nombre": "Camilo ",
        "Apellido": "torres suarez",
        "telefono": 312456
    });
});

RutaVueloUsuario.post("/vuelo" , (req, res) =>{
    console.log(req.body);
    let nombre = req.body.name;

    res.json({
        "respuesta": "Esto es un post para agregar a " + nombre
    });
});
export default RutaVueloUsuario;
