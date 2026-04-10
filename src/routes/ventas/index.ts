import express from "express";
import {
  ventaAlta,
  ventaBaja,
  ventaModificacion,
  ventas,
  ventaPorId,
} from "../../controllers/ventas/index.js";

const router = express.Router();

router.post("/", ventaAlta);
router.delete("/:id_funcion", ventaBaja);
router.put("/update/:id_funcion", ventaModificacion);
router.get("/", ventas);
router.get("/:id_funcion", ventaPorId);

export default router;
