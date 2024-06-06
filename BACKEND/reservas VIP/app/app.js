import express from "express";

import RutaVuelo from "./routes/routes.vuelos.js";

import cors from "cors";

import bodyParser from "body-parser";

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


//RUTAS
app.get("/kors", (req, res) =>{
    res.send("Bienvenido al mundo de la programacion, sigue asi y no te desanimes");
});

app.use("/api" , RutaVuelo);

export default app;