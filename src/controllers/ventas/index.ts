//id_venta: number;
//id_vendedor: number; // FK a un administrador
//id_cliente: number;
//fecha_venta: Date;
//monto_total: number;

import type { Request, Response } from "express";
import type { Venta } from "../../types/venta.js";
import { sequelize } from "../../database.js";

const ventaAlta = async (req: Request, res: Response) => {
  try {
    const { id_vendedor, id_cliente, fecha_venta, monto_total } =
      req.body as Venta;
    const fechaSanitizada = new Date(fecha_venta);
    await sequelize.query(
      "CALL spu_venta_alta(:id_vendedor, :id_cliente, :fechaSanitizada, :monto_total)",
      {
        replacements: {
          id_vendedor,
          id_cliente,
          fechaSanitizada,
          monto_total,
        },
      },
    );
    res.status(201).json({
      message: "Venta creada exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear la venta",
      error,
    });
  }
};

const ventaBaja = async (req: Request, res: Response) => {
  try {
    const { id_venta } = req.params;
    await sequelize.query("CALL spu_venta_baja(:id_venta)", {
      replacements: { id_venta },
    });
    res.status(200).json({
      message: "Venta eliminada exitosamente",
      data: id_venta,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar la venta",
      error,
    });
  }
};

const ventaModificacion = async (req: Request, res: Response) => {
  try {
    const { id_venta } = req.params;
    const { id_vendedor, id_cliente, fecha_venta, monto_total } =
      req.body as Venta;
    const fechaSanitizada = new Date(fecha_venta);
    await sequelize.query(
      "CALL spu_venta_modificacion(:id_venta, :id_vendedor, :id_cliente, :fechaSanitizada, :monto_total)",
      {
        replacements: {
          id_venta,
          id_vendedor,
          id_cliente,
          fechaSanitizada,
          monto_total,
        },
      },
    );
    res.status(200).json({
      message: "Venta modificada exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al modificar la venta",
      error,
    });
  }
};

const ventas = async (req: Request, res: Response) => {
  try {
    const ventas = await sequelize.query("CALL spu_ventas()");
    res.status(200).json({
      message: "Ventas obtenidas exitosamente",
      data: ventas,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el listado de ventas",
      error,
    });
  }
};

const ventaPorId = async (req: Request, res: Response) => {
  try {
    const { id_venta } = req.params;
    const venta = await sequelize.query("CALL spu_venta_por_id(:id_venta)", {
      replacements: { id_venta },
    });
    res.status(200).json({
      message: "Venta obtenida exitosamente",
      data: venta,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener la venta por ID",
      error,
    });
  }
};

const ventasPorFuncion = async (req: Request, res: Response) => {
  try {
    const { id_funcion } = req.params;
    const ventas = await sequelize.query(
      "CALL spu_ventas_por_funcion(:id_funcion)",
      {
        replacements: { id_funcion },
      },
    );

    res.status(200).json({
      message: "Ventas obtenidas exitosamente",
      data: ventas,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener las ventas por función",
      error,
    });
  }
};

export {
  ventaAlta,
  ventaBaja,
  ventaModificacion,
  ventas,
  ventaPorId,
  ventasPorFuncion,
};
