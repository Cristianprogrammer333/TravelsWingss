import app from "./app/app.js";
import { config } from "dotenv";
import colors from "colors";
config();

let port = process.env.PORT;

app.listen(port, (req, res) =>{
    console.log(`Servidor corriendo en el puerto ${port.zebra}`);
});

