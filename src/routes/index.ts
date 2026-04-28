import express from "express";
import administradorRoutes from "./administradores/index.js";
import clienteRoutes from "./clientes/index.js";
import espectadorRoutes from "./espectadores/index.js";
import obraRoutes from "./obras/index.js";
import funcionRoutes from "./funciones/index.js";
import ventaRoutes from "./ventas/index.js";
import ticketRoutes from "./tickets/index.js";

const router = express.Router();

router.use("/administrador", administradorRoutes);
router.use("/cliente", clienteRoutes);
router.use("/espectador", espectadorRoutes);
router.use("/obra", obraRoutes);
router.use("/funcion", funcionRoutes);
router.use("/venta", ventaRoutes);
router.use("/ticket", ticketRoutes);

export default router;
