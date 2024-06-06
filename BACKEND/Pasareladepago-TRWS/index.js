import app from "./app/app.js";
import { config } from "dotenv";
config();

let port = process.env.PORT;

app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`)
});
