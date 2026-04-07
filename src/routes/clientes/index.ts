import express from 'express';
import {
    clienteAlta,
    clienteBaja,
    clienteModificacion,
    clientes,
    clientePorId
} from "../../controllers/clientes/index.js";

const router = express.Router();

router.post('/', clienteAlta);
router.delete('/:id_cliente', clienteBaja);
router.put('/update/:id_cliente', clienteModificacion);
router.get('/', clientes);
router.get('/:id_cliente', clientePorId);

export default router;