import type { Request, Response } from "express";
import type { Espectador } from "../../types/espectador.js";
import { sequelize } from "../../database.js";

const espectadorAlta = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, dni } = req.body as Espectador;
    await sequelize.query(
      "CALL spu_espectador_alta(:nombre, :apellido, :dni)",
      {
        replacements: { nombre, apellido, dni },
      },
    );
    res.status(201).json({
      message: "Espectador creado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear al espectador",
      error,
    });
  }
};

const espectadorBaja = async (req: Request, res: Response) => {
  try {
    const { id_espectador } = req.params;
    const result: any = await sequelize.query(
      "CALL spu_espectador_baja(:id_espectador)",
      {
        replacements: { id_espectador },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el espectador con el ID proporcionado",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Espectador eliminado exitosamente",
      data: id_espectador,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar al espectador",
      error,
    });
  }
};

const espectadorModificacion = async (req: Request, res: Response) => {
  try {
    const { id_espectador } = req.params;
    const { nombre, apellido, dni } = req.body as Espectador;
    const result: any = await sequelize.query(
      "CALL spu_espectador_modificacion(:id_espectador, :nombre, :apellido, :dni)",
      {
        replacements: { id_espectador, nombre, apellido, dni },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el espectador con el ID proporcionado",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Espectador modificado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al modificar al espectador",
      error,
    });
  }
};

const espectadores = async (req: Request, res: Response) => {
  try {
    const results: any = await sequelize.query("CALL spu_espectadores()");

    if (results[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontraron espectadores",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Espectadores obtenidos exitosamente",
      data: results,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el listado de espectadores",
      error,
    });
  }
};

const espectadorPorId = async (req: Request, res: Response) => {
  try {
    const { id_espectador } = req.params;
    const result: any = await sequelize.query(
      "CALL spu_espectador_por_id(:id_espectador)",
      {
        replacements: { id_espectador },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el espectador con el ID proporcionado",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Espectador obtenido exitosamente",
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener al espectador por ID",
      error,
    });
  }
};

export {
  espectadorAlta,
  espectadorBaja,
  espectadorModificacion,
  espectadores,
  espectadorPorId,
};
