CREATE DATABASE venta_entradas;
use venta_entradas;

CREATE TABLE `administradores` (
  `id_administrador` integer PRIMARY KEY,
  `nombre` nvarchar(60)
);

CREATE TABLE `clientes` (
  `id_cliente` integer PRIMARY KEY,
  `nombre` nvarchar(60),
  `apellido` nvarchar(60),
  `dni` nvarchar(30),
  `contacto` nvarchar(60)
);

CREATE TABLE `espectadores` (
  `id_espectador` integer PRIMARY KEY,
  `nombre` nvarchar(60),
  `apellido` nvarchar(60),
  `dni` nvarchar(30) COMMENT 'opcional'
);

CREATE TABLE `obras` (
  `id_obra` integer PRIMARY KEY,
  `id_administrador` integer,
  `nombre` nvarchar(120),
  `dramaturgo` nvarchar(120)
);

CREATE TABLE `funciones` (
  `id_funcion` integer PRIMARY KEY,
  `id_obra` integer,
  `descripcion` nvarchar(300),
  `fecha` date,
  `ubicacion` nvarchar(120),
  `precio_entrada` decimal
);

CREATE TABLE `ventas` (
  `id_venta` integer PRIMARY KEY,
  `id_vendedor` integer,
  `id_cliente` integer,
  `fecha_venta` date,
  `monto_total` decimal
);

CREATE TABLE `tickets` (
  `id_ticket` integer PRIMARY KEY,
  `id_venta` integer,
  `id_funcion` integer,
  `id_espectador` integer
);

ALTER TABLE `funciones` ADD FOREIGN KEY (`id_obra`) REFERENCES `obras` (`id_obra`);

ALTER TABLE `obras` ADD FOREIGN KEY (`id_administrador`) REFERENCES `administradores` (`id_administrador`);

ALTER TABLE `ventas` ADD FOREIGN KEY (`id_vendedor`) REFERENCES `administradores` (`id_administrador`);

ALTER TABLE `ventas` ADD FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`id_espectador`) REFERENCES `espectadores` (`id_espectador`);
