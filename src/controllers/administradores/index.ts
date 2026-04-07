import type { Request, Response } from "express";
import type { Administrador } from "../../types/administrador.js";
import { sequelize } from "../../database.js";

const adminAlta = async (req: Request, res: Response) => {
  try {
    const { id_administrador, nombre } = req.body as Administrador;
    await sequelize.query("CALL spu_admin_alta(:id_administrador, :nombre)", {
      replacements: { id_administrador, nombre },
    });
    res.status(201).json({
      message: "Administrador creado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el administrador",
      error,
    });
  }
};

const adminBaja = async (req: Request, res: Response) => {
  try {
    const { id_administrador } = req.params;
    await sequelize.query("CALL spu_admin_baja(:id_administrador)", {
      replacements: { id_administrador },
    });
    res.status(200).json({
      message: "Administrador eliminado exitosamente",
      data: id_administrador,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar al administrador",
      error,
    });
  }
};

const adminModificacion = async (req: Request, res: Response) => {
  try {
    const { id_administrador } = req.params;
    const { nombre } = req.body as Administrador;
    await sequelize.query(
      "CALL spu_admin_modificacion(:id_administrador, :nombre)",
      {
        replacements: { id_administrador, nombre },
      },
    );
    res.status(200).json({
      message: "Administrador modificado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al modificar al administrador",
      error,
    });
  }
};

const administradores = async (req: Request, res: Response) => {
  try {
    const administradores = await sequelize.query("CALL spu_administradores()");
    res.status(200).json({
      message: "Administradores obtenidos exitosamente",
      data: administradores,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el listado de administradores",
      error,
    });
  }
};

const adminPorId = async (req: Request, res: Response) => {
  try {
    const { id_administrador } = req.params;
    const administrador = await sequelize.query(
      "CALL spu_admin_por_id(:id_administrador)",
      {
        replacements: { id_administrador },
      },
    );
    res.status(200).json({
      message: "Administrador obtenido exitosamente",
      data: administrador,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener al administrador por ID",
      error,
    });
  }
};

export {
  adminAlta,
  adminBaja,
  adminModificacion,
  administradores,
  adminPorId,
};
