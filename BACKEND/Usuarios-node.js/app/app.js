import express from "express";
import Ruta from "./routes/index.js";
import cors from "cors";
// import RutaUsuario from "./routes/routes.usuarios.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

//RUTAS
app.get("/", (req, res) =>{
    res.send("Welcome to DATABASE");
});

app.use("/", Ruta);

export default app;