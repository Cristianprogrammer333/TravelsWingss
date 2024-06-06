import { Router } from "express";

const rutaAprendiz = Router();

rutaAprendiz.get("/aprendiz", (req, res) =>{
    res.json({
        "nombre":"Aprendiz Julian",
        "apellido":"Aprendiz Vergara",
        "telefono":33333
    })
})
rutaAprendiz.post("/usuario", (req, res)=>{

    console.log(req.body);
    let nombre = req.body.name;

    res.json({
        "respuesta":"Esto es un post para agregar "+ nombre 
    })
})
export default rutaAprendiz;

