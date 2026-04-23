import type { Request, Response } from "express";
import type { Funcion } from "../../types/funcion.js";
import { sequelize } from "../../database.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

const funcionAlta = async (req: RequestWithFile, res: Response) => {
  try {
    const { id_administrador, descripcion, fecha, ubicacion, precio_entrada } =
      req.body as Funcion;

    const fechaParaSQL = new Date(fecha).toISOString().split("T")[0];
    let imagen_url = null;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "funciones",
      });
      imagen_url = uploadRes.secure_url;
      fs.unlinkSync(req.file.path);
    }

    await sequelize.query(
      "CALL spu_funcion_alta(:id_administrador, :descripcion, :fechaParaSQL, :ubicacion, :precio_entrada, :imagen_url)",
      {
        replacements: {
          id_administrador,
          descripcion,
          fechaParaSQL,
          ubicacion,
          precio_entrada,
          imagen_url,
        },
      },
    );
    res.status(201).json({
      message: "Función creada exitosamente",
      data: { ...req.body, imagen_url },
      error: false,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
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

const funcionModificacion = async (req: RequestWithFile, res: Response) => {
  try {
    const { id_funcion } = req.params;
    const {
      id_administrador,
      descripcion,
      fecha,
      ubicacion,
      precio_entrada,
      imagen_url: current_url,
    } = req.body as Funcion;
    const fechaSanitizada = new Date(fecha);

    let imagen_url = current_url || null;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "funciones",
      });
      imagen_url = uploadRes.secure_url;
      fs.unlinkSync(req.file.path);
    }

    await sequelize.query(
      "CALL spu_funcion_modificacion(:id_funcion, :id_administrador, :descripcion, :fechaSanitizada, :ubicacion, :precio_entrada, :imagen_url)",
      {
        replacements: {
          id_funcion,
          id_administrador,
          descripcion,
          fechaSanitizada,
          ubicacion,
          precio_entrada,
          imagen_url,
        },
      },
    );
    res.status(200).json({
      message: "Función modificada exitosamente",
      data: { ...req.body, imagen_url },
      error: false,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({
      message: "Error al modificar la función",
      error,
    });
  }
};

const funciones = async (req: Request, res: Response) => {
  try {
    const funciones = await sequelize.query("CALL spu_funciones()");
    res.status(200).json({
      message: "Funciones obtenidas exitosamente",
      data: funciones,
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
    const funcion = await sequelize.query(
      "CALL spu_funcion_por_id(:id_funcion)",
      {
        replacements: { id_funcion },
      },
    );
    res.status(200).json({
      message: "Función obtenida exitosamente",
      data: funcion,
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
