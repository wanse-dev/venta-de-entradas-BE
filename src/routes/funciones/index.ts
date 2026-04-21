import express from "express";
import multer from "multer";
import {
  funcionAlta,
  funcionBaja,
  funcionModificacion,
  funciones,
  funcionPorId,
} from "../../controllers/funciones/index.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("imagen"), funcionAlta);
router.delete("/:id_funcion", funcionBaja);
router.put("/update/:id_funcion", upload.single("imagen"), funcionModificacion);
router.get("/", funciones);
router.get("/:id_funcion", funcionPorId);

export default router;
