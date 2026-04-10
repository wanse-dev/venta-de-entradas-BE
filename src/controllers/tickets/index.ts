import type { Request, Response } from "express";
import type { Ticket } from "../../types/ticket.js";
import { sequelize } from "../../database.js";

const ticketAlta = async (req: Request, res: Response) => {
  try {
    const { id_venta, id_funcion, id_espectador } = req.body as Ticket;
    await sequelize.query(
      "CALL spu_ticket_alta(:id_venta, :id_funcion, :id_espectador)",
      {
        replacements: {
          id_venta,
          id_funcion,
          id_espectador,
        },
      },
    );
    res.status(201).json({
      message: "Ticket creado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el ticket",
      error,
    });
  }
};

const ticketBaja = async (req: Request, res: Response) => {
  try {
    const { id_ticket } = req.params;
    await sequelize.query("CALL spu_ticket_baja(:id_ticket)", {
      replacements: { id_ticket },
    });
    res.status(200).json({
      message: "Ticket eliminado exitosamente",
      data: id_ticket,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar el ticket",
      error,
    });
  }
};

const ticketModificacion = async (req: Request, res: Response) => {
  try {
    const { id_ticket } = req.params;
    const { id_venta, id_funcion, id_espectador } = req.body as Ticket;
    await sequelize.query(
      "CALL spu_ticket_modificacion(:id_ticket, :id_venta, :id_funcion, :id_espectador)",
      {
        replacements: {
          id_ticket,
          id_venta,
          id_funcion,
          id_espectador,
        },
      },
    );
    res.status(200).json({
      message: "Ticket modificado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al modificar el ticket",
      error,
    });
  }
};

const tickets = async (req: Request, res: Response) => {
  try {
    const tickets = await sequelize.query("CALL spu_tickets()");
    res.status(200).json({
      message: "Tickets obtenidos exitosamente",
      data: tickets,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el listado de tickets",
      error,
    });
  }
};

const ticketPorId = async (req: Request, res: Response) => {
  try {
    const { id_ticket } = req.params;
    const ticket = await sequelize.query("CALL spu_ticket_por_id(:id_ticket)", {
      replacements: { id_ticket },
    });
    res.status(200).json({
      message: "Ticket obtenido exitosamente",
      data: ticket,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el ticket por ID",
      error,
    });
  }
};

export { ticketAlta, ticketBaja, ticketModificacion, tickets, ticketPorId };
