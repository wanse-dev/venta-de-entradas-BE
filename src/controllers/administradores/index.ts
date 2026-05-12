import type { Request, Response } from "express";
import type { Administrador } from "../../types/administrador.js";
import { sequelize } from "../../database.js";

const adminAlta = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body as Administrador;
    await sequelize.query("CALL spu_admin_alta(:nombre)", {
      replacements: { nombre },
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
    const result: any = await sequelize.query(
      "CALL spu_admin_baja(:id_administrador)",
      {
        replacements: { id_administrador },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el administrador con el ID proporcionado",
        data: null,
        error: true,
      });
    }

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
    const result: any = await sequelize.query(
      "CALL spu_admin_modificacion(:id_administrador, :nombre)",
      {
        replacements: { id_administrador, nombre },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el administrador con el ID proporcionado",
        data: null,
        error: true,
      });
    }

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
    const results: any = await sequelize.query("CALL spu_administradores()");

    if (!results || results.length === 0) {
      return res.status(404).json({
        message: "No se encontraron administradores",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Administradores obtenidos exitosamente",
      data: results,
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
    const result: any = await sequelize.query(
      "CALL spu_admin_por_id(:id_administrador)",
      {
        replacements: { id_administrador },
      },
    );

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "No se encontró el administrador con el ID proporcionado",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Administrador obtenido exitosamente",
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener al administrador por ID",
      error,
    });
  }
};

export { adminAlta, adminBaja, adminModificacion, administradores, adminPorId };
