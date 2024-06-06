import { Router } from "express";

const RutaConfigReserva =Router();

RutaConfigReserva.get("/config", (req, res) =>{
    res.json({
        "ID_vuelo": "01002",
        "Nombre": "West weston",
        "Destino": "miami"
    });
});

RutaConfigReserva.post("/config" , (req, res) =>{
    console.log(req.body);
    let nombre = req.body.name;
    res.json({
        "respuesta": "El vuelo a sido configurado para " + nombre
    });
});

export default RutaConfigReserva;
