import { Router } from "express";

const RutaCasosEspeciales = Router();

RutaCasosEspeciales.get("/Caso", (req, res) => {
  res.json({
    "user-id": 11,
    service_id: 110,
    description:
      "Servicios de traducción y asistencia para pasajeros que no hablan español, durante el proceso de check-in y embarque.",
    telefono: 2034123,
  });
});

RutaCasosEspeciales.post("/Caso", (req, res) => {
  console.log(req.body);
  let nombre = req.body.name;

  res.json({
    "respuesta": "El servicio se ha ingresado correctamente a Paulina Marin" + nombre
  });
});

export default RutaCasosEspeciales;