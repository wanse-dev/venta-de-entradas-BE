import express from "express";
import {
  funcionAlta,
  funcionBaja,
  funcionModificacion,
  funciones,
  funcionPorId,
} from "../../controllers/funciones/index.js";

const router = express.Router();

router.post("/", funcionAlta);
router.delete("/:id_funcion", funcionBaja);
router.put("/update/:id_funcion", funcionModificacion);
router.get("/", funciones);
router.get("/:id_funcion", funcionPorId);

export default router;
