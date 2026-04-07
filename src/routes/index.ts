import express from "express";
import administradorRoutes from "./administradores/index.js";
import clienteRoutes from "./clientes/index.js";

const router = express.Router();

router.use("/administrador", administradorRoutes);
router.use("/cliente", clienteRoutes);

export default router;