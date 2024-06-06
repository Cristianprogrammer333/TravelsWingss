import { Router } from "express";

const RutaRegistroVuelos = Router();

RutaRegistroVuelos.get("/registro", (req, res) =>{
    res.json({
        "Nombre":"Camila",
        "apellidos": "gutierrez florez",
        "Destino": "Arabia saudita",
        "vuelo": "23 de mayo"
    });

});


RutaRegistroVuelos.post("/registro", (req, res) =>{
    console.log(req.body);
    let nombre = req.body.name;
    res.json({
        "respuesta": "El post esta funcionando correctamente"
    });
});

export default RutaRegistroVuelos;