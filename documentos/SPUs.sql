DELIMITER //

/* --- ADMINISTRADORES --- */

CREATE PROCEDURE spu_admin_alta(
    IN _id_administrador INT,
    IN _nombre VARCHAR(60)
)
BEGIN
    INSERT INTO administradores (id_administrador, nombre)
    VALUES (_id_administrador, _nombre);
    SELECT _id_administrador AS id_administrador;
END //

CREATE PROCEDURE spu_admin_baja(IN _id_administrador INT)
BEGIN
    DELETE FROM administradores WHERE id_administrador = _id_administrador;
END //

CREATE PROCEDURE spu_admin_modificacion(
    IN _id_administrador INT,
    IN _nombre VARCHAR(60)
)
BEGIN
    UPDATE administradores SET nombre = _nombre WHERE id_administrador = _id_administrador;
END //

CREATE PROCEDURE spu_administradores()
BEGIN
    SELECT id_administrador, nombre FROM administradores ORDER BY nombre ASC;
END //

CREATE PROCEDURE spu_admin_por_id(IN _id_administrador INT)
BEGIN
    SELECT id_administrador, nombre FROM administradores WHERE id_administrador = _id_administrador;
END //


/* --- OBRAS --- */

CREATE PROCEDURE spu_obra_alta(
    IN _id_obra INT,
    IN _id_administrador INT,
    IN _nombre VARCHAR(120),
    IN _dramaturgo VARCHAR(120)
)
BEGIN
    INSERT INTO obras (id_obra, id_administrador, nombre, dramaturgo)
    VALUES (_id_obra, _id_administrador, _nombre, _dramaturgo);
    SELECT _id_obra AS id_obra;
END //

CREATE PROCEDURE spu_obra_baja(IN _id_obra INT)
BEGIN
    DELETE FROM obras WHERE id_obra = _id_obra;
END //

CREATE PROCEDURE spu_obra_modificacion(
    IN _id_obra INT,
    IN _id_administrador INT,
    IN _nombre VARCHAR(120),
    IN _dramaturgo VARCHAR(120)
)
BEGIN
    UPDATE obras 
    SET id_administrador = _id_administrador, 
        nombre = _nombre, 
        dramaturgo = _dramaturgo 
    WHERE id_obra = _id_obra;
END //

CREATE PROCEDURE spu_obras()
BEGIN
    SELECT id_obra, id_administrador, nombre, dramaturgo FROM obras ORDER BY nombre ASC;
END //


/* --- FUNCIONES --- */

CREATE PROCEDURE spu_funcion_alta(
    IN _id_funcion INT,
    IN _id_obra INT,
    IN _descripcion VARCHAR(300),
    IN _fecha DATE,
    IN _ubicacion VARCHAR(120),
    IN _precio_entrada DECIMAL(10,2)
)
BEGIN
    INSERT INTO funciones (id_funcion, id_obra, descripcion, fecha, ubicacion, precio_entrada)
    VALUES (_id_funcion, _id_obra, _descripcion, _fecha, _ubicacion, _precio_entrada);
    SELECT _id_funcion AS id_funcion;
END //

CREATE PROCEDURE spu_funcion_baja(IN _id_funcion INT)
BEGIN
    DELETE FROM funciones WHERE id_funcion = _id_funcion;
END //

CREATE PROCEDURE spu_funcion_modificacion(
    IN _id_funcion INT,
    IN _id_obra INT,
    IN _descripcion VARCHAR(300),
    IN _fecha DATE,
    IN _ubicacion VARCHAR(120),
    IN _precio_entrada DECIMAL(10,2)
)
BEGIN
    UPDATE funciones 
    SET id_obra = _id_obra,
        descripcion = _descripcion,
        fecha = _fecha,
        ubicacion = _ubicacion,
        precio_entrada = _precio_entrada
    WHERE id_funcion = _id_funcion;
END //

CREATE PROCEDURE spu_funciones()
BEGIN
    SELECT id_funcion, id_obra, descripcion, fecha, ubicacion, precio_entrada 
    FROM funciones ORDER BY fecha ASC;
END //

CREATE PROCEDURE spu_funcion_por_id(IN _id_funcion INT)
BEGIN
    SELECT id_funcion, id_obra, descripcion, fecha, ubicacion, precio_entrada 
    FROM funciones WHERE id_funcion = _id_funcion;
END //


/* --- VENTAS --- */

CREATE PROCEDURE spu_venta_alta(
    IN _id_venta INT,
    IN _id_vendedor INT,
    IN _id_cliente INT,
    IN _fecha_venta DATE,
    IN _monto_total DECIMAL(10,2)
)
BEGIN
    INSERT INTO ventas (id_venta, id_vendedor, id_cliente, fecha_venta, monto_total)
    VALUES (_id_venta, _id_vendedor, _id_cliente, _fecha_venta, _monto_total);
    SELECT _id_venta AS id_venta;
END //

CREATE PROCEDURE spu_venta_baja(IN _id_venta INT)
BEGIN
    DELETE FROM ventas WHERE id_venta = _id_venta;
END //

CREATE PROCEDURE spu_venta_modificacion(
    IN _id_venta INT,
    IN _id_vendedor INT,
    IN _id_cliente INT,
    IN _fecha_venta DATE,
    IN _monto_total DECIMAL(10,2)
)
BEGIN
    UPDATE ventas
    SET id_vendedor = _id_vendedor,
        id_cliente = _id_cliente,
        fecha_venta = _fecha_venta,
        monto_total = _monto_total
    WHERE id_venta = _id_venta;
END //

CREATE PROCEDURE spu_ventas()
BEGIN
    SELECT id_venta, id_vendedor, id_cliente, fecha_venta, monto_total 
    FROM ventas ORDER BY fecha_venta DESC;
END //

CREATE PROCEDURE spu_venta_por_id(IN _id_venta INT)
BEGIN
    SELECT id_venta, id_vendedor, id_cliente, fecha_venta, monto_total 
    FROM ventas WHERE id_venta = _id_venta;
END //

CREATE PROCEDURE spu_ventas_por_funcion(IN _id_funcion INT)
BEGIN
    SELECT DISTINCT v.*
    FROM ventas v
    JOIN tickets t ON v.id_venta = t.id_venta
    WHERE t.id_funcion = _id_funcion
    ORDER BY v.fecha_venta DESC;
END //

CREATE PROCEDURE spu_venta_actualizar_total(IN _id_venta INT)
BEGIN
    UPDATE ventas v
    SET v.monto_total = (
        SELECT SUM(f.precio_entrada)
        FROM tickets t
        JOIN funciones f ON t.id_funcion = f.id_funcion
        WHERE t.id_venta = _id_venta
    )
    WHERE v.id_venta = _id_venta;
END //


/* --- TICKETS --- */

CREATE PROCEDURE spu_ticket_alta(
    IN _id_ticket INT,
    IN _id_venta INT,
    IN _id_funcion INT,
    IN _id_espectador INT
)
BEGIN
    INSERT INTO tickets (id_ticket, id_venta, id_funcion, id_espectador)
    VALUES (_id_ticket, _id_venta, _id_funcion, _id_espectador);
    SELECT _id_ticket AS id_ticket;
END //

CREATE PROCEDURE spu_ticket_baja(IN _id_ticket INT)
BEGIN
    DELETE FROM tickets WHERE id_ticket = _id_ticket;
END //

CREATE PROCEDURE spu_ticket_modificacion(
    IN _id_ticket INT,
    IN _id_venta INT,
    IN _id_funcion INT,
    IN _id_espectador INT
)
BEGIN
    UPDATE tickets
    SET id_venta = _id_venta,
        id_funcion = _id_funcion,
        id_espectador = _id_espectador
    WHERE id_ticket = _id_ticket;
END //

CREATE PROCEDURE spu_tickets()
BEGIN
    SELECT id_ticket, id_venta, id_funcion, id_espectador 
    FROM tickets ORDER BY id_ticket DESC;
END //

CREATE PROCEDURE spu_ticket_por_id(IN _id_ticket INT)
BEGIN
    SELECT id_ticket, id_venta, id_funcion, id_espectador 
    FROM tickets WHERE id_ticket = _id_ticket;
END //


/* --- ESPECTADORES --- */

CREATE PROCEDURE spu_espectador_alta(
    IN _id_espectador INT,
    IN _nombre VARCHAR(60),
    IN _apellido VARCHAR(60),
    IN _dni VARCHAR(30)
)
BEGIN
    INSERT INTO espectadores (id_espectador, nombre, apellido, dni)
    VALUES (_id_espectador, _nombre, _apellido, _dni);
    SELECT _id_espectador AS id_espectador;
END //

CREATE PROCEDURE spu_espectador_baja(IN _id_espectador INT)
BEGIN
    DELETE FROM espectadores WHERE id_espectador = _id_espectador;
END //

CREATE PROCEDURE spu_espectador_modificacion(
    IN _id_espectador INT,
    IN _nombre VARCHAR(60),
    IN _apellido VARCHAR(60),
    IN _dni VARCHAR(30)
)
BEGIN
    UPDATE espectadores
    SET nombre = _nombre,
        apellido = _apellido,
        dni = _dni
    WHERE id_espectador = _id_espectador;
END //

CREATE PROCEDURE spu_espectadores()
BEGIN
    SELECT id_espectador, nombre, apellido, dni FROM espectadores ORDER BY apellido ASC;
END //

CREATE PROCEDURE spu_espectador_por_id(IN _id_espectador INT)
BEGIN
    SELECT id_espectador, nombre, apellido, dni FROM espectadores WHERE id_espectador = _id_espectador;
END //


/* --- CLIENTES --- */

CREATE PROCEDURE spu_cliente_alta(
    IN _id_cliente INT,
    IN _nombre VARCHAR(60),
    IN _apellido VARCHAR(60),
    IN _dni VARCHAR(30),
    IN _contacto VARCHAR(60)
)
BEGIN
    INSERT INTO clientes (id_cliente, nombre, apellido, dni, contacto)
    VALUES (_id_cliente, _nombre, _apellido, _dni, _contacto);
    SELECT _id_cliente AS id_cliente;
END //

CREATE PROCEDURE spu_cliente_baja(IN _id_cliente INT)
BEGIN
    DELETE FROM clientes WHERE id_cliente = _id_cliente;
END //

CREATE PROCEDURE spu_cliente_modificacion(
    IN _id_cliente INT,
    IN _nombre VARCHAR(60),
    IN _apellido VARCHAR(60),
    IN _dni VARCHAR(30),
    IN _contacto VARCHAR(60)
)
BEGIN
    UPDATE clientes
    SET nombre = _nombre,
        apellido = _apellido,
        dni = _dni,
        contacto = _contacto
    WHERE id_cliente = _id_cliente;
END //

CREATE PROCEDURE spu_clientes()
BEGIN
    SELECT id_cliente, nombre, apellido, dni, contacto FROM clientes ORDER BY apellido ASC;
END //

CREATE PROCEDURE spu_cliente_por_id(IN _id_cliente INT)
BEGIN
    SELECT id_cliente, nombre, apellido, dni, contacto FROM clientes WHERE id_cliente = _id_cliente;
END //

DELIMITER ;