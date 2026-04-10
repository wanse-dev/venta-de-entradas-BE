import express from "express";
import {
  ventaAlta,
  ventaBaja,
  ventaModificacion,
  ventas,
  ventaPorId,
  ventasPorFuncion,
} from "../../controllers/ventas/index.js";

const router = express.Router();

router.post("/", ventaAlta);
router.delete("/:id_venta", ventaBaja);
router.put("/update/:id_venta", ventaModificacion);
router.get("/", ventas);
router.get("/:id_venta", ventaPorId);
router.get("/funcion/:id_funcion", ventasPorFuncion);

export default router;
