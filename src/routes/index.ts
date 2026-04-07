import express from "express";
import administradorRoutes from "./administradores/index.js";

const router = express.Router();

router.use("/administrador", administradorRoutes);

export default router;