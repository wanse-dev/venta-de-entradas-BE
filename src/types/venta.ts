export interface Venta {
  id_venta: number;
  id_vendedor: number; // FK a un administrador
  id_cliente: number;
  fecha_venta: Date;
  monto_total: number;
}
