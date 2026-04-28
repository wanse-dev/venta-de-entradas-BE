import type { Request, Response } from "express";
import { sequelize } from "../../database.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

const obraAlta = async (req: RequestWithFile, res: Response) => {
  try {
    const { id_obra, id_administrador, nombre, dramaturgo } = req.body;
    let imagen_url = null;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "obras",
      });
      imagen_url = uploadRes.secure_url;
      fs.unlinkSync(req.file.path);
    }

    await sequelize.query(
      "CALL spu_obra_alta(:id_obra, :id_administrador, :nombre, :dramaturgo, :imagen_url)",
      {
        replacements: {
          id_obra,
          id_administrador,
          nombre,
          dramaturgo,
          imagen_url,
        },
      },
    );

    res.status(201).json({
      message: "Obra creada exitosamente",
      data: { ...req.body, imagen_url },
      error: false,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({
      message: "Error al crear la obra",
      error,
    });
  }
};

const obraBaja = async (req: Request, res: Response) => {
  try {
    const { id_obra } = req.params;
    await sequelize.query("CALL spu_obra_baja(:id_obra)", {
      replacements: { id_obra },
    });
    res.status(200).json({
      message: "Obra eliminada exitosamente",
      data: id_obra,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar la obra",
      error,
    });
  }
};

const obraModificacion = async (req: RequestWithFile, res: Response) => {
  try {
    const { id_obra } = req.params;
    const {
      id_administrador,
      nombre,
      dramaturgo,
      imagen_url: current_url,
    } = req.body;

    let imagen_url = current_url || null;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "obras",
      });
      imagen_url = uploadRes.secure_url;
      fs.unlinkSync(req.file.path);
    }

    await sequelize.query(
      "CALL spu_obra_modificacion(:id_obra, :id_administrador, :nombre, :dramaturgo, :imagen_url)",
      {
        replacements: {
          id_obra,
          id_administrador,
          nombre,
          dramaturgo,
          imagen_url,
        },
      },
    );

    res.status(200).json({
      message: "Obra modificada exitosamente",
      data: { ...req.body, imagen_url },
      error: false,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({
      message: "Error al modificar la obra",
      error,
    });
  }
};

const obras = async (req: Request, res: Response) => {
  try {
    const [results] = await sequelize.query("CALL spu_obras()");
    res.status(200).json({
      message: "Obras obtenidas exitosamente",
      data: results,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el listado de obras",
      error,
    });
  }
};

const obraPorId = async (req: Request, res: Response) => {
  try {
    const { id_obra } = req.params;
    const [results] = await sequelize.query("CALL spu_obra_por_id(:id_obra)", {
      replacements: { id_obra },
    });
    res.status(200).json({
      message: "Obra obtenida exitosamente",
      data: results,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener la obra por ID",
      error,
    });
  }
};

export { obraAlta, obraBaja, obraModificacion, obras, obraPorId };
