import app from "./app/app.js";
import { config } from "dotenv";
import colors from "colors";
config();

let port = process.env.PORT;

app.listen(port, () =>{
    console.log(`Estamos en el puerto ${port.bgCyan}`);
});