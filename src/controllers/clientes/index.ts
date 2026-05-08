import type { Request, Response } from "express";
import type { Cliente } from "../../types/cliente.js";
import { sequelize } from "../../database.js";

const clienteAlta = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, dni, contacto } = req.body as Cliente;
    await sequelize.query(
      "CALL spu_cliente_alta(:nombre, :apellido, :dni, :contacto)",
      {
        replacements: { nombre, apellido, dni, contacto },
      },
    );
    res.status(201).json({
      message: "Cliente creado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el cliente",
      error,
    });
  }
};

const clienteBaja = async (req: Request, res: Response) => {
  try {
    const { id_cliente } = req.params;
    const result: any = await sequelize.query(
      "CALL spu_cliente_baja(:id_cliente)",
      {
        replacements: { id_cliente },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el cliente con el ID proporcionado",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Cliente eliminado exitosamente",
      data: id_cliente,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar al cliente",
      error,
    });
  }
};

const clienteModificacion = async (req: Request, res: Response) => {
  try {
    const { id_cliente } = req.params;
    const { nombre, apellido, dni, contacto } = req.body as Cliente;
    const result: any = await sequelize.query(
      "CALL spu_cliente_modificacion(:id_cliente, :nombre, :apellido, :dni, :contacto)",
      {
        replacements: { id_cliente, nombre, apellido, dni, contacto },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el cliente con el ID proporcionado",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Cliente modificado exitosamente",
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al modificar al cliente",
      error,
    });
  }
};

const clientes = async (req: Request, res: Response) => {
  try {
    const results: any = await sequelize.query("CALL spu_clientes()");

    if (results[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontraron clientes",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Clientes obtenidos exitosamente",
      data: results,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener el listado de clientes",
      error,
    });
  }
};

const clientePorId = async (req: Request, res: Response) => {
  try {
    const { id_cliente } = req.params;
    const result: any = await sequelize.query(
      "CALL spu_cliente_por_id(:id_cliente)",
      {
        replacements: { id_cliente },
      },
    );

    if (result[0]?.filasAfectadas === 0) {
      return res.status(404).json({
        message: "No se encontró el cliente con el ID proporcionado",
        data: null,
        error: true,
      });
    }

    res.status(200).json({
      message: "Cliente obtenido exitosamente",
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener al cliente por ID",
      error,
    });
  }
};

export {
  clienteAlta,
  clienteBaja,
  clienteModificacion,
  clientes,
  clientePorId,
};
