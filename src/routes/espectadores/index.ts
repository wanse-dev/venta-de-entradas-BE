import express from 'express';
import {
    espectadorAlta,
    espectadorBaja,
    espectadorModificacion,
    espectadores,
    espectadorPorId
} from "../../controllers/espectadores/index.js";

const router = express.Router();

router.post('/', espectadorAlta);
router.delete('/:id_espectador', espectadorBaja);
router.put('/update/:id_espectador', espectadorModificacion);
router.get('/', espectadores);
router.get('/:id_espectador', espectadorPorId);

export default router;