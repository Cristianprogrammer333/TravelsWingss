import { Router } from "express";
import { MostrarDash } from "../controllers/controller.dash";

const RutaDash = Router();

RutaDash.get("/dash", MostrarDash);

export default RutaDash;