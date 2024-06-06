// Importar el modulo express para crear un a aplicacion web
import express from "express";

//importar el modulo path para trabajar con rutas de archivos y directorios
import path from "path";
//importar el impotador de rutas de pago desde un archivo llamado 'payment.routes.js'
import paymentRoutes  from './app/routes/payment.routes.js';

//libreria para darle color al servidor
import colors from "colors";

//importa la constante PORT desde un archivo de configuracion llamado config.js
import { PORT } from "./app/config/config.js";

// Crea una instancia de la aplicacion express
const app = express();

//Utiliza el enrutador de rutas de pago en la aplicacion
app.use(paymentRoutes);

// app.use(express.static(__dirname + '/public'));
//configura express para servir archivos estaticos desde la carpeta 'app/view'
app.use(express.static(path.resolve('app/view')));
//Hace que la aplicacion se encuentre en el puerto 3333
app.listen(PORT);

//Imprime un mensaje en la consola indicando que el servidor esta escuchando en el puerto
console.log('Server on port', PORT);



