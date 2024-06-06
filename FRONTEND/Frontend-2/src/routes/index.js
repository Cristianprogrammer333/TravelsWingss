import { Router } from "express";

import RutaUsuario from "./routes.usuario";

import RutaDash from "./routes.dash";

import RutaReserva from "./routes.reservas";

import RutaVuelo from "./routes.vuelo";

import RutaServicioEspecial from "./routes.especiales";

import RutaCalendario from "./routes.calendario";

import RutaMoneda from "./routes.moneda";

import RutaPaypal from "./routes.paypal";

const ruta = Router();
ruta.use("/", RutaUsuario);
ruta.use("/", RutaDash);
ruta.use("/" , RutaReserva);
ruta.use("/", RutaVuelo);
ruta.use("/", RutaServicioEspecial);
ruta.use("/", RutaCalendario);
ruta.use("/", RutaMoneda);
ruta.use("/", RutaPaypal);


export default ruta;

