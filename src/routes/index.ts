import express from "express";
import administradorRoutes from "./administradores/index.js";
import clienteRoutes from "./clientes/index.js";
import espectadorRoutes from "./espectadores/index.js";

const router = express.Router();

router.use("/administrador", administradorRoutes);
router.use("/cliente", clienteRoutes);
router.use("/espectador", espectadorRoutes);

export default router;