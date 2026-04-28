import express from "express";
import multer from "multer";
import {
  obraAlta,
  obraBaja,
  obraModificacion,
  obras,
  obraPorId,
} from "../../controllers/obras/index.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("imagen"), obraAlta as any);
router.delete("/:id_obra", obraBaja);
router.put("/update/:id_obra", upload.single("imagen"), obraModificacion as any);
router.get("/", obras);
router.get("/:id_obra", obraPorId);

export default router;
