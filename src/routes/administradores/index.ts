import express from 'express';
import {
    adminAlta,
    adminBaja,
    adminModificacion,
    administradores,
    adminPorId
} from "../../controllers/administradores/index.js";

const router = express.Router();

router.post('/', adminAlta);
router.delete('/:id_administrador', adminBaja);
router.put('/update/:id_administrador', adminModificacion);
router.get('/', administradores);
router.get('/:id_administrador', adminPorId);

export default router;