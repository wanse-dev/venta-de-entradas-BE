export interface Funcion {
  id_funcion: number;
  id_administrador: number;
  descripcion: string;
  fecha: Date;
  ubicacion: string;
  precio_entrada: number;
  imagen_url?: string;
}
