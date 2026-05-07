import type { Request, Response } from "express";
import type { Venta } from "../../types/venta.js";
import { sequelize } from "../../database.js";

const ventaAlta = async (req: Request, res: Response) => {
  try {
    const { id_vendedor, id_cliente, fecha_venta, monto_total } =
      req.body as Venta;
    const fechaSanitizada = new Date(fecha_venta).toISOString().split("T")[0];
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

    const result: any = await sequelize.query(
      "CALL spu_venta_baja(:id_venta)",
      {
        replacements: { id_venta },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró la venta con el ID proporcionado",
        data: null,
        error: true,
      });
    }

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
    const fechaSanitizada = new Date(fecha_venta).toISOString().split("T")[0];

    const result: any = await sequelize.query(
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

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró la venta con el ID proporcionado",
        data: null,
        error: true,
      });
    }

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
    const results: any = await sequelize.query("CALL spu_ventas()");

    if (results[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontraron ventas",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Ventas obtenidas exitosamente",
      data: results,
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
    const result: any = await sequelize.query(
      "CALL spu_venta_por_id(:id_venta)",
      {
        replacements: { id_venta },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "La venta solicitada no existe",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Venta obtenida exitosamente",
      data: result,
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
    const results: any = await sequelize.query(
      "CALL spu_ventas_por_funcion(:id_funcion)",
      {
        replacements: { id_funcion },
      },
    );

    if (results[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontraron ventas para la función solicitada",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Ventas obtenidas exitosamente",
      data: results,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener las ventas por función",
      error,
    });
  }
};

const actualizarTotal = async (req: Request, res: Response) => {
  try {
    const { id_venta } = req.params;
    const results: any = await sequelize.query(
      "CALL spu_venta_actualizar_total(:id_venta)",
      {
        replacements: { id_venta },
      },
    );

    console.log(results);

    if (results[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "La venta a la cual se intenta actualizar el total no existe",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Total de ventas actualizado exitosamente",
      data: id_venta,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el total de la venta",
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
  actualizarTotal,
};
