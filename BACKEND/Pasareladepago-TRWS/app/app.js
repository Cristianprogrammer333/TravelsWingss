import express from "express";
import Ruta from "./routes/index.js";
import cors from "cors";

const app = express();


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Rutas
app.get("/", (req, res) =>{
    res.send("Bienvenido al sistema");
})

app.use("/", Ruta);
export default app;
