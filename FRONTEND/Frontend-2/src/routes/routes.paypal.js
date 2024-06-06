import { Router } from "express";
import { MostrarPaypal } from "../controllers/controller.paypal";

const RutaPaypal = Router();

RutaPaypal.get("/paypal", MostrarPaypal);

export default RutaPaypal;
