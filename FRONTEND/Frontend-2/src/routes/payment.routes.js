//Importar el modulo 'Router' del paquete 'express'
import { Router } from "express";
import { CancelOrder, CaptureOrder, CreateOrder } from "../controllers/payment.controller.js";

// Crea una instancia de un enrutador express
const router = Router();

//Define una ruta GET '/create-order' que responde con 'Order created'
router.post("/create-order", CreateOrder);

//Define una ruta GET '/capture-order' que responde con 'Capture created'
router.get("/capture-order", CaptureOrder);

//Define una ruta GET '/cancel-order' que responde con 'Cancel payment'
router.get("/cancel-order", CancelOrder);


//exportar el enrutador para que pueda ser utilizado en otros archivos
export default router;