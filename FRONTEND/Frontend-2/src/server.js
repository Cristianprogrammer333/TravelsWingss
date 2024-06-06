import express from "express";
import { config } from "dotenv";
import ejs from "ejs";
import ruta from "./routes";

config();

const app = express();

app.set('view engine' , 'ejs');
app.set('views', __dirname+'/views');
app.set("port" , process.env.PORT || 11000);
app.use(express.static(__dirname + '/public'));
app.use("/", ruta);

export default app;