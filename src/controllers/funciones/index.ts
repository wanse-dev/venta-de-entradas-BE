import type { Request, Response } from "express";
import { sequelize } from "../../database.js";

const funcionAlta = async (req: Request, res: Response) => {
  try {
    const {
      id_funcion,
      id_obra,
      descripcion,
      fecha,
      ubicacion,
      precio_entrada,
    } = req.body;

    const fechaParaSQL = new Date(fecha).toISOString().split("T")[0];

    await sequelize.query(
      "CALL spu_funcion_alta(:id_funcion, :id_obra, :descripcion, :fechaParaSQL, :ubicacion, :precio_entrada)",
      {
        replacements: {
          id_funcion,
          id_obra,
          descripcion,
          fechaParaSQL,
          ubicacion,
          precio_entrada,
        },
      },
    );

    res.status(201).json({
      message: "Función creada exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear la función",
      error,
    });
  }
};

const funcionBaja = async (req: Request, res: Response) => {
  try {
    const { id_funcion } = req.params;
    await sequelize.query("CALL spu_funcion_baja(:id_funcion)", {
      replacements: { id_funcion },
    });
    res.status(200).json({
      message: "Función eliminada exitosamente",
      data: id_funcion,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar la función",
      error,
    });
  }
};

const funcionModificacion = async (req: Request, res: Response) => {
  try {
    const { id_funcion } = req.params;
    const { id_obra, descripcion, fecha, ubicacion, precio_entrada } = req.body;

    const fechaParaSQL = new Date(fecha).toISOString().split("T")[0];

    await sequelize.query(
      "CALL spu_funcion_modificacion(:id_funcion, :id_obra, :descripcion, :fechaParaSQL, :ubicacion, :precio_entrada)",
      {
        replacements: {
          id_funcion,
          id_obra,
          descripcion,
          fechaParaSQL,
          ubicacion,
          precio_entrada,
        },
      },
    );

    res.status(200).json({
      message: "Función modificada exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al modificar la función",
      error,
    });
  }
};

const funciones = async (req: Request, res: Response) => {
  try {
    const [results] = await sequelize.query("CALL spu_funciones()");
    res.status(200).json({
      message: "Funciones obtenidas exitosamente",
      data: results,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el listado de funciones",
      error,
    });
  }
};

const funcionPorId = async (req: Request, res: Response) => {
  try {
    const { id_funcion } = req.params;
    const [results] = await sequelize.query(
      "CALL spu_funcion_por_id(:id_funcion)",
      {
        replacements: { id_funcion },
      },
    );
    res.status(200).json({
      message: "Función obtenida exitosamente",
      data: results,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener la función por ID",
      error,
    });
  }
};

export {
  funcionAlta,
  funcionBaja,
  funcionModificacion,
  funciones,
  funcionPorId,
};
