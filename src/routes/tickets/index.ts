import express from "express";
import {
  ticketAlta,
  ticketBaja,
  ticketModificacion,
  tickets,
  ticketPorId,
} from "../../controllers/tickets/index.js";

const router = express.Router();

router.post("/", ticketAlta);
router.delete("/:id_ticket", ticketBaja);
router.put("/update/:id_ticket", ticketModificacion);
router.get("/", tickets);
router.get("/:id_ticket", ticketPorId);

export default router;
